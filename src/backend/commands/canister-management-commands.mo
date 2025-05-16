import BaseEnums "mo:waterway-mops/base/enums";
import Enums "mo:waterway-mops/product/wwl/enums";
import Ids "mo:waterway-mops/base/ids";

module CanisterManagementCommands {
    public type AddController = {
        app : Enums.WaterwayLabsApp;
        canisterId : Ids.CanisterId;
        controller : Ids.PrincipalId;
        canisterType : BaseEnums.CanisterType;
    };

    public type RemoveController = {
        app : Enums.WaterwayLabsApp;
        canisterId : Ids.CanisterId;
        controller : Ids.PrincipalId;
        canisterType : BaseEnums.CanisterType;
    };
};

