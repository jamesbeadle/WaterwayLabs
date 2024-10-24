import OpenfplIcon from "$lib/icons/svgs/openfpl.svelte";

export type Project = {
  component: typeof OpenfplIcon;
  name: string;
  title: string;
  description: string;
  summary: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  backgroundImage: string;
  previewImage: string;
  translateX: string;
  selected?: boolean;
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
