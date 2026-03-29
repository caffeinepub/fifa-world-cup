import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import List "mo:core/List";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  type UserId = Principal;
  type PlanId = Nat;
  type TXId = Nat;
  type Timestamp = Int;

  module InvestmentPlan {
    public func compare(a : InvestmentPlan, b : InvestmentPlan) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type InvestmentPlan = {
    id : Nat;
    name : Text;
    price : Float;
    dailyReturn : Float;
    durationDays : Nat;
    description : Text;
    active : Bool;
  };

  module User {
    public func compare(a : User, b : User) : Order.Order {
      Text.compare(a.username, b.username);
    };
  };

  type User = {
    username : Text;
    phone : Text;
    referralCode : Text;
    referredBy : ?Text;
    walletBalance : Float;
    totalEarned : Float;
    totalRecharged : Float;
    totalWithdrawn : Float;
    lastDailyClaim : Timestamp;
  };

  module Investment {
    public func compare(a : Investment, b : Investment) : Order.Order {
      Nat.compare(a.planId, b.planId);
    };
  };

  type Investment = {
    userId : UserId;
    planId : PlanId;
    amount : Float;
    startTime : Timestamp;
    dailyEarnings : Float;
    totalEarned : Float;
    active : Bool;
  };

  type RechargeStatus = {
    #pending;
    #completed;
    #failed;
  };

  module Recharge {
    public func compare(a : Recharge, b : Recharge) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Recharge = {
    id : TXId;
    userId : UserId;
    amount : Float;
    paymentRef : Text;
    status : RechargeStatus;
    timestamp : Timestamp;
  };

  type WithdrawalStatus = {
    #pending;
    #approved;
    #rejected;
  };

  module Withdrawal {
    public func compare(a : Withdrawal, b : Withdrawal) : Order.Order {
      Nat.compare(a.id, b.id);
    };
  };

  type Withdrawal = {
    id : TXId;
    userId : UserId;
    amount : Float;
    paymentDetails : Text;
    status : WithdrawalStatus;
    timestamp : Timestamp;
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Persistent state
  var nextPlanId = 1;
  var nextTxId = 1;

  let users = Map.empty<UserId, User>();
  let plans = Map.empty<PlanId, InvestmentPlan>();
  let investments = List.empty<Investment>();
  let recharges = Map.empty<TXId, Recharge>();
  let withdrawals = Map.empty<TXId, Withdrawal>();

  // User management
  public shared ({ caller }) func registerUser(username : Text, phone : Text, referralCode : Text) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous users cannot register") };
    switch (users.get(caller)) {
      case (?user) { Runtime.trap("User already registered") };
      case (null) {
        let newUser : User = {
          username;
          phone;
          referralCode = generateReferralCode(caller);
          referredBy = if (referralCode == "") { null } else { ?referralCode };
          walletBalance = 0.0;
          totalEarned = 0.0;
          totalRecharged = 0.0;
          totalWithdrawn = 0.0;
          lastDailyClaim = 0;
        };
        users.add(caller, newUser);
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?User {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    users.get(caller);
  };

  public query ({ caller }) func getUserProfile(userId : UserId) : async {
    #ok : User;
    #notFound;
  } {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    switch (users.get(userId)) {
      case (null) { #notFound };
      case (?user) { #ok(user) };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : User) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    users.add(caller, profile);
  };

  public shared ({ caller }) func updateUserProfile(phone : Text) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous users cannot update profile") };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update profiles");
    };
    let user = switch (users.get(caller)) {
      case (null) { Runtime.trap("User not found") };
      case (?user) { user };
    };
    let updatedUser = {
      user with
      phone;
    };
    users.add(caller, updatedUser);
  };

  // Investment plans
  public shared ({ caller }) func addOrUpdatePlan(plan : InvestmentPlan) : async PlanId {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add or update plans");
    };
    if (plan.id == 0) {
      let newPlan : InvestmentPlan = {
        plan with
        id = nextPlanId;
      };
      plans.add(nextPlanId, newPlan);
      nextPlanId += 1;
      newPlan.id;
    } else {
      switch (plans.get(plan.id)) {
        case (null) { Runtime.trap("Plan not found") };
        case (?existingPlan) {
          if (existingPlan.active) {
            let updatedPlan = {
              existingPlan with
              name = plan.name;
              price = plan.price;
              dailyReturn = plan.dailyReturn;
              durationDays = plan.durationDays;
              description = plan.description;
            };
            plans.add(plan.id, updatedPlan);
            existingPlan.id;
          } else {
            Runtime.trap("Cannot modify inactive plan");
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllPlans() : async [InvestmentPlan] {
    plans.values().toArray().sort();
  };

  // Investments
  public shared ({ caller }) func createInvestment(planId : PlanId, amount : Float) : async {
    #ok : ();
    #notFound;
    #insufficientBalance;
  } {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous users cannot create investments") };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create investments");
    };

    switch (users.get(caller)) {
      case (null) { #notFound };
      case (?user) {
        switch (plans.get(planId)) {
          case (null) { #notFound };
          case (?plan) {
            if (not plan.active) { #notFound } else if (user.walletBalance < amount) {
              #insufficientBalance;
            } else {
              let newInvestment : Investment = {
                userId = caller;
                planId;
                amount;
                startTime = Time.now();
                dailyEarnings = amount * plan.dailyReturn / 100.0;
                totalEarned = 0.0;
                active = true;
              };
              investments.add(newInvestment);
              let updatedUser = {
                user with
                walletBalance = user.walletBalance - amount;
              };
              users.add(caller, updatedUser);
              #ok(());
            };
          };
        };
      };
    };
  };

  public query ({ caller }) func getUserInvestments(userId : UserId) : async [Investment] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own investments");
    };
    investments.toArray().filter(func(inv) { inv.userId == userId }).sort();
  };

  public shared ({ caller }) func claimDailyEarnings() : async {
    #ok : Float;
    #notRegistered;
    #dailyLimitReached;
  } {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous users cannot claim earnings") };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can claim earnings");
    };
    switch (users.get(caller)) {
      case (null) { #notRegistered };
      case (?user) {
        let now = Time.now();
        if (now - user.lastDailyClaim < 24 * 60 * 60 * 1_000_000_000) {
          #dailyLimitReached;
        } else {
          var totalEarnings = 0.0;
          let updatedInvestments = investments.map<Investment, Investment>(
            func(i) {
              if (i.userId == caller and i.active) {
                totalEarnings += i.dailyEarnings;
                { i with totalEarned = i.totalEarned + i.dailyEarnings };
              } else {
                i;
              };
            }
          );
          investments.clear();
          investments.addAll(updatedInvestments.values());
          let updatedUser = {
            user with
            walletBalance = user.walletBalance + totalEarnings;
            totalEarned = user.totalEarned + totalEarnings;
            lastDailyClaim = now;
          };
          users.add(caller, updatedUser);
          #ok(totalEarnings);
        };
      };
    };
  };

  // Recharges & Withdrawals
  public shared ({ caller }) func initiateRecharge(amount : Float, paymentRef : Text) : async TXId {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous users cannot initiate recharge") };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initiate recharge");
    };
    let txId = nextTxId;
    nextTxId += 1;
    let recharge : Recharge = {
      id = txId;
      userId = caller;
      amount;
      paymentRef;
      status = #pending;
      timestamp = Time.now();
    };
    recharges.add(txId, recharge);
    txId;
  };

  public shared ({ caller }) func createWithdrawal(amount : Float, paymentDetails : Text) : async {
    #ok : TXId;
    #notRegistered;
    #insufficientBalance;
  } {
    if (caller.isAnonymous()) { Runtime.trap("Anonymous users cannot create withdrawals") };
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create withdrawals");
    };

    switch (users.get(caller)) {
      case (null) { #notRegistered };
      case (?user) {
        if (user.walletBalance < amount) { #insufficientBalance } else {
          let txId = nextTxId;
          nextTxId += 1;
          let withdrawal : Withdrawal = {
            id = txId;
            userId = caller;
            amount;
            paymentDetails;
            status = #pending;
            timestamp = Time.now();
          };
          let updatedUser = {
            user with
            walletBalance = user.walletBalance - amount;
            totalWithdrawn = user.totalWithdrawn + amount;
          };
          users.add(caller, updatedUser);
          withdrawals.add(txId, withdrawal);
          #ok(txId);
        };
      };
    };
  };

  public shared ({ caller }) func approveRecharge(rechargeId : TXId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve recharges");
    };
    switch (recharges.get(rechargeId)) {
      case (null) { Runtime.trap("Recharge not found") };
      case (?recharge) {
        switch (users.get(recharge.userId)) {
          case (null) { Runtime.trap("User not found") };
          case (?user) {
            let updatedRecharge = { recharge with status = #completed };
            recharges.add(rechargeId, updatedRecharge);
            let updatedUser = {
              user with
              walletBalance = user.walletBalance + recharge.amount;
              totalRecharged = user.totalRecharged + recharge.amount;
            };
            users.add(recharge.userId, updatedUser);
          };
        };
      };
    };
  };

  public shared ({ caller }) func rejectRecharge(rechargeId : TXId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject recharges");
    };
    switch (recharges.get(rechargeId)) {
      case (null) { Runtime.trap("Recharge not found") };
      case (?recharge) {
        let updatedRecharge = { recharge with status = #failed };
        recharges.add(rechargeId, updatedRecharge);
      };
    };
  };

  public shared ({ caller }) func approveWithdrawal(withdrawalId : TXId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve withdrawals");
    };
    switch (withdrawals.get(withdrawalId)) {
      case (null) { Runtime.trap("Withdrawal not found") };
      case (?withdrawal) {
        let updatedWithdrawal = { withdrawal with status = #approved };
        withdrawals.add(withdrawalId, updatedWithdrawal);
      };
    };
  };

  public shared ({ caller }) func rejectWithdrawal(withdrawalId : TXId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can reject withdrawals");
    };
    switch (withdrawals.get(withdrawalId)) {
      case (null) { Runtime.trap("Withdrawal not found") };
      case (?withdrawal) {
        // Refund the user's balance
        switch (users.get(withdrawal.userId)) {
          case (null) {};
          case (?user) {
            let updatedUser = {
              user with
              walletBalance = user.walletBalance + withdrawal.amount;
              totalWithdrawn = user.totalWithdrawn - withdrawal.amount;
            };
            users.add(withdrawal.userId, updatedUser);
          };
        };
        let updatedWithdrawal = { withdrawal with status = #rejected };
        withdrawals.add(withdrawalId, updatedWithdrawal);
      };
    };
  };

  // Admin functions
  public query ({ caller }) func getAllUsers() : async [User] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all users");
    };
    users.values().toArray().sort();
  };

  public query ({ caller }) func getAllRecharges() : async [Recharge] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all recharges");
    };
    recharges.values().toArray().sort();
  };

  public query ({ caller }) func getAllWithdrawals() : async [Withdrawal] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all withdrawals");
    };
    withdrawals.values().toArray().sort();
  };

  // Referral System
  public query ({ caller }) func getReferralTree(userId : UserId) : async {
    level1 : [UserId];
    level2 : [UserId];
    level3 : [UserId];
  } {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own referral tree");
    };
    let level1Users = getReferrals(userId);
    let level2Users = flatten(level1Users.map<UserId, List.List<UserId>>(func(u1) { getReferrals(u1) }));
    let level3Users = flatten(level2Users.map<UserId, List.List<UserId>>(func(u2) { getReferrals(u2) }));
    {
      level1 = level1Users.toArray();
      level2 = level2Users.toArray();
      level3 = level3Users.toArray();
    };
  };

  // Helper functions
  func generateReferralCode(userId : Principal) : Text {
    userId.toText();
  };

  func getReferrals(userId : UserId) : List.List<UserId> {
    let user = switch (users.get(userId)) {
      case (?user) { user };
      case (null) { return List.empty() };
    };
    let code = user.referralCode;
    let referrals = users.toArray().filter(func(tuple) { tuple.1.referredBy == ?code });
    let referralIds = referrals.map(func(tuple) { tuple.0 });
    List.fromArray<UserId>(referralIds);
  };

  func flatten<T>(listOfLists : List.List<List.List<T>>) : List.List<T> {
    let result = List.empty<T>();
    for (sublist in listOfLists.values()) {
      result.addAll(sublist.values());
    };
    result;
  };
};
