import Enums "../enums/enums";
import MopsIds "mo:waterway-mops/Ids";
import MopsEnums "mo:waterway-mops/Enums";

module CanisterQueries {

    public type GetProjectCanisters = {
        app : Enums.WaterwayLabsApp;
    };

    public type ProjectCanisters = {
        entries : [CanisterInfo];
    };

    public type CanisterInfo = {
        app : Enums.WaterwayLabsApp;
        canisterName : Text;
        canisterId : MopsIds.CanisterId;
        cycles : Nat;
        computeAllocation : Nat;
        freezeThreshold : Nat;
        memoryAllocation : Nat;
        controllers : [MopsIds.PrincipalId];
        memoryUsage : Nat;
        canisterType : MopsEnums.CanisterType;
        canisterStatus : MopsEnums.CanisterStatus;
    };
};
