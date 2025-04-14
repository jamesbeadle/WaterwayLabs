import Enums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";

module CanisterManagementCommands {
    public type AddController = {
        app : Enums.WaterwayLabsApp;
        canisterId : Ids.CanisterId;
        controller : Ids.PrincipalId;
        canisterType : Enums.CanisterType;
    };

    public type RemoveController = {
        app : Enums.WaterwayLabsApp;
        canisterId : Ids.CanisterId;
        controller : Ids.PrincipalId;
        canisterType : Enums.CanisterType;
    };
};

