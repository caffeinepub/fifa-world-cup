import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface Withdrawal {
    id: TXId;
    status: WithdrawalStatus;
    userId: UserId;
    paymentDetails: string;
    timestamp: Timestamp;
    amount: number;
}
export type TXId = bigint;
export interface User {
    referralCode: string;
    username: string;
    totalRecharged: number;
    totalEarned: number;
    referredBy?: string;
    totalWithdrawn: number;
    lastDailyClaim: Timestamp;
    phone: string;
    walletBalance: number;
}
export interface InvestmentPlan {
    id: bigint;
    durationDays: bigint;
    active: boolean;
    name: string;
    description: string;
    dailyReturn: number;
    price: number;
}
export interface Investment {
    startTime: Timestamp;
    active: boolean;
    dailyEarnings: number;
    planId: PlanId;
    userId: UserId;
    totalEarned: number;
    amount: number;
}
export type PlanId = bigint;
export interface Recharge {
    id: TXId;
    status: RechargeStatus;
    userId: UserId;
    timestamp: Timestamp;
    paymentRef: string;
    amount: number;
}
export enum RechargeStatus {
    pending = "pending",
    completed = "completed",
    failed = "failed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_ok_insufficientBalance_notFound {
    ok = "ok",
    insufficientBalance = "insufficientBalance",
    notFound = "notFound"
}
export enum WithdrawalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export interface backendInterface {
    addOrUpdatePlan(plan: InvestmentPlan): Promise<PlanId>;
    approveRecharge(rechargeId: TXId): Promise<void>;
    rejectRecharge(rechargeId: TXId): Promise<void>;
    approveWithdrawal(withdrawalId: TXId): Promise<void>;
    rejectWithdrawal(withdrawalId: TXId): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimDailyEarnings(): Promise<{
        __kind__: "ok";
        ok: number;
    } | {
        __kind__: "dailyLimitReached";
        dailyLimitReached: null;
    } | {
        __kind__: "notRegistered";
        notRegistered: null;
    }>;
    createInvestment(planId: PlanId, amount: number): Promise<Variant_ok_insufficientBalance_notFound>;
    createWithdrawal(amount: number, paymentDetails: string): Promise<{
        __kind__: "ok";
        ok: TXId;
    } | {
        __kind__: "insufficientBalance";
        insufficientBalance: null;
    } | {
        __kind__: "notRegistered";
        notRegistered: null;
    }>;
    getAllPlans(): Promise<Array<InvestmentPlan>>;
    getAllRecharges(): Promise<Array<Recharge>>;
    getAllUsers(): Promise<Array<User>>;
    getAllWithdrawals(): Promise<Array<Withdrawal>>;
    getCallerUserProfile(): Promise<User | null>;
    getCallerUserRole(): Promise<UserRole>;
    getReferralTree(userId: UserId): Promise<{
        level1: Array<UserId>;
        level2: Array<UserId>;
        level3: Array<UserId>;
    }>;
    getUserInvestments(userId: UserId): Promise<Array<Investment>>;
    getUserProfile(userId: UserId): Promise<{
        __kind__: "ok";
        ok: User;
    } | {
        __kind__: "notFound";
        notFound: null;
    }>;
    initiateRecharge(amount: number, paymentRef: string): Promise<TXId>;
    isCallerAdmin(): Promise<boolean>;
    registerUser(username: string, phone: string, referralCode: string): Promise<void>;
    saveCallerUserProfile(profile: User): Promise<void>;
    updateUserProfile(phone: string): Promise<void>;
}
