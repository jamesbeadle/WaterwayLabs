import Enums "mo:waterway-mops/product/wwl/enums";
import Ids "mo:waterway-mops/product/wwl/ids";

import AppEnums "../enums";

module AppCommands {

    public type CreateSupportQuery = {
        contact : Text;
        message : Text;
        name : Text;
        app : Enums.WaterwayLabsApp;
    };

    public type ArchiveSupportQuery = {
        supportQueryId : Ids.SupportQueryId;
    };

    public type AssignSupportQueryToTeamMember = {
        supportQueryId : Ids.SupportQueryId;
        teamMemberId : Ids.TeamMemberId;
        assignedOn : Int;
    };

    public type UpdateSupportQueryStatus = {
        supportQueryId : Ids.SupportQueryId;
        updatedStatus : AppEnums.SupportQueryStatus;
    };

    public type AddSupportQueryComment = {
        supportQueryId : Ids.SupportQueryId;
        comment : Text;
    };

    public type RemoveSupportQuery = {
        supportQueryId : Ids.SupportQueryId;
    };
    
};
