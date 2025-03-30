
import Enums "../enums/enums";
import MopsIds "../types/mops_ids";

module CanisterQueries {

    public type GetProjectCanisters = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
    };

    public type ProjectCanisters = {
        entries: [CanisterInfo];
    };

    public type CanisterInfo = {
        app: Enums.WaterwayLabsApp;
        canisterName: Text;
        canisterId: MopsIds.CanisterId;
        cycles: Nat;
        computeAllocation: Nat;
        freezeThreshold: Nat;
        memoryAllocation: Nat;
        controllers: [MopsIds.PrincipalId];
        memoryUsage: Nat;
        //TODO: Others
    };
}