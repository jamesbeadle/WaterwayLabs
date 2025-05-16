import AppEnums "mo:waterway-mops/product/wwl/enums";
import Ids "mo:waterway-mops/base/ids";
import AppTypes "../types";
import Enums "../enums";

module SupportQueries {
    public type GetSupportQueries = {
        app : ?AppEnums.WaterwayLabsApp;
        page : Nat;
        status : ?Enums.QueryStatus;
        dateFrom : ?Int;
        dateTo : ?Int;
    };

    public type SupportQueries = {
        supportQueries : [SupportQuery];
        page : Nat;
        totalEntries : Nat;
        app : ?AppEnums.WaterwayLabsApp;
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
        app : Text;
    };

    public type GetUserSupportQueries = {
        page : Nat;
        dateFrom : ?Int;
        dateTo : ?Int;
        status : ?Enums.QueryStatus;
    };

    public type GetArchivedSupportQueries = {
        app : ?AppEnums.WaterwayLabsApp;
        page : Nat;
    };

    public type GetArchivedUserSupportQueries = {
        page : Nat;
        dateFrom : ?Int;
        dateTo : ?Int;
        status : ?Enums.QueryStatus;

    };
};
