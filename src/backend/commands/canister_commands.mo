import Enums "../enums/enums";
import MopsIds "../types/mops_ids";

module CanisterCommands {
    
    public type TopupCanister = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        cycles: Nat64;
    };

    public type SetComputeAllocation = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        computeAllocation: Nat;
    };

    public type SetMemoryAllocation = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        memoryAllocation: Nat;
    };

    public type SetFreezingThreshold = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        freezingThreshold: Nat;
    };

    public type AddController = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        controller: MopsIds.PrincipalId;
    };

    public type RemoveController = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        controller: MopsIds.PrincipalId;
    };

    public type TakeCanisterSnapshot = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
    };
}