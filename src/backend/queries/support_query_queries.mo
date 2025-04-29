import MopsEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
import AppTypes "../types/app_types";
import Enums "../enums/app_enums";

module SupportQueries{
    public type GetSupportQueries = {
        app: ?MopsEnums.WaterwayLabsApp;
        page: Nat;
    };

    public type SupportQueries = {
        supportQueries: [SupportQuery];
        page: Nat;
        totalEntries: Nat;
        app: ?MopsEnums.WaterwayLabsApp;
    };

    public type SupportQuery = {
        id : AppTypes.SupportQueryId;
        name : Text;
        message : Text;
        contact : Text;
        status : Enums.QueryStatus;
        submittedBy : Ids.PrincipalId;
        submittedOn : Int;
        assignedTo : Ids.PrincipalId;
    };  

    public type GetUserSupportQueries = {
        page: Nat;
    };

    public type GetArchivedSupportQueries = {
        app: ?MopsEnums.WaterwayLabsApp;
        page: Nat;
    };

    public type GetArchivedUserSupportQueries = {
        page: Nat;
    };
}