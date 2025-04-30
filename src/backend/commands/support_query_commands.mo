import Enums "../enums/app_enums";
import WWLIds "mo:waterway-mops/WWLIds";
module AppCommands {

    public type CreateSupportQuery = {
        contact : Text;
        message : Text;
        name : Text;
    };

    public type ArchiveSupportQuery = {
        supportQueryId : WWLIds.SupportQueryId;
    };

    public type AssignSupportQueryToTeamMember = {
        supportQueryId : WWLIds.SupportQueryId;
        teamMemberId : WWLIds.TeamMemberId;
        assignedOn : Int;
    };

    public type UpdateSupportQueryStatus = {
        supportQueryId : WWLIds.SupportQueryId;
        updatedStatus : Enums.SupportQueryStatus;
    };

    public type AddSupportQueryComment = {
        supportQueryId : WWLIds.SupportQueryId;
        comment : Text;
    };

    public type RemoveSupportQueryComment = {
        supportQueryId : WWLIds.SupportQueryId;
    };
};
