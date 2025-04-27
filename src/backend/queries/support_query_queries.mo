import MopsEnums "mo:waterway-mops/Enums";
import AppTypes "../types/app_types";

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
        submittedBy : MopsIds.PrincipalId;
        submittedOn : Int;
        assignedTo : TeamMember;
    };  
}