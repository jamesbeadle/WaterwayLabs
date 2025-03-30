
import Enums "../enums/enums";
import MopsIds "../types/mops_ids";

module CanisterQueries {

    public type GetCanisterInfo = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
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