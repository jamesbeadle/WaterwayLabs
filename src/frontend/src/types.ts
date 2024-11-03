import OpenfplIcon from "$lib/icons/svgs/openfpl.svelte";

export type Project = {
  component: typeof OpenfplIcon;
  id: number;
  buttonText: string;
  backgroundImage: string;
  previewImage: string;
  mobilePreviewImage: string;
  translateX: string;
  selected?: boolean;
  status: string;
  summaryClass?: string;
};

export type CanisterType =
  | { SNS: null }
  | { Dapp: null }
  | { Manager: null }
  | { WeeklyLeaderboard: null }
  | { MonthlyLeaderboard: null }
  | { SeasonLeaderboard: null }
  | { Archive: null };

export type GetCanistersDTO = {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  entries: Canister[];
  canisterTypeFilter?: CanisterType;
};

export type Canister = {
  canisterId: string;
  canister_type: CanisterType;
  cycles: bigint;
  lastTopup: number;
};
