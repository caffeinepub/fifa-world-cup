import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { InvestmentPlan, PlanId, TXId } from "../backend";
import { useActor } from "./useActor";

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllPlans() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPlans();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserInvestments(userId: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["investments", userId],
    queryFn: async () => {
      if (!actor || !userId) return [];
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getUserInvestments(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useAllRecharges() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["recharges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRecharges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllWithdrawals() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWithdrawals();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllUsers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllUsers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReferralTree(userId: string | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["referralTree", userId],
    queryFn: async () => {
      if (!actor || !userId) return { level1: [], level2: [], level3: [] };
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getReferralTree(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
  });
}

export function useRegisterUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      phone,
      referralCode,
    }: { username: string; phone: string; referralCode: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.registerUser(username, phone, referralCode);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

export function useClaimDailyEarnings() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.claimDailyEarnings();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

export function useCreateInvestment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      planId,
      amount,
    }: { planId: PlanId; amount: number }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createInvestment(planId, amount);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userProfile"] });
      qc.invalidateQueries({ queryKey: ["investments"] });
    },
  });
}

export function useInitiateRecharge() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      amount,
      paymentRef,
    }: { amount: number; paymentRef: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.initiateRecharge(amount, paymentRef);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recharges"] }),
  });
}

export function useCreateWithdrawal() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      amount,
      paymentDetails,
    }: { amount: number; paymentDetails: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createWithdrawal(amount, paymentDetails);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["withdrawals"] });
      qc.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
}

export function useApproveRecharge() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rechargeId: TXId) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveRecharge(rechargeId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recharges"] }),
  });
}

export function useRejectRecharge() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rechargeId: TXId) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).rejectRecharge(rechargeId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["recharges"] }),
  });
}

export function useApproveWithdrawal() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (withdrawalId: TXId) => {
      if (!actor) throw new Error("Not connected");
      return actor.approveWithdrawal(withdrawalId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["withdrawals"] }),
  });
}

export function useRejectWithdrawal() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (withdrawalId: TXId) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).rejectWithdrawal(withdrawalId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["withdrawals"] }),
  });
}

export function useAddOrUpdatePlan() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (plan: InvestmentPlan) => {
      if (!actor) throw new Error("Not connected");
      return actor.addOrUpdatePlan(plan);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["plans"] }),
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (phone: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateUserProfile(phone);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}
