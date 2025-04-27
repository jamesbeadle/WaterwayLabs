import MopsEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
import AppTypes "../types/app_types";
import Enums "../enums/app_enums";

module SupportQueries{
    public type GetSupportQueries = {
        app: ?MopsEnums.WaterwayLabsApp;
        
    };

    public type SupportQueries = {
        supportQueries: [SupportQuery];
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
}