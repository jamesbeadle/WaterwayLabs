import Enums "../enums/enums";
import Ids "mo:waterway-mops/Ids";
import WWWLIds "mo:waterway-mops/WWLIds";
module AppCommands {

    public type CreateSupportQuery = {
        createdBy : Ids.PrincipalId;
        contact : Text;
        message : Text;
        name : Text;
    };

    public type ArchiveSupportQuery = {
        //TODO
    };

    public type AssignSupportQueryToTeamMember = {
        supportQueryId : WWWLIds.SupportQueryId;
        teamMemberId : WWWLIds.TeamMemberId;
        assignedOn : Int;
    };

    public type UpdateSupportQueryStatus = {
        supportQueryId : WWWLIds.SupportQueryId;
        updatedStatus : Enums.SupportQueryStatus;
    };

    public type AddSupportQueryComment = {
        supportQueryId : WWWLIds.SupportQueryId;
        comment : Text;
    };

    public type RemoveSupportQueryComment = {
        supportQueryId : WWWLIds.SupportQueryId;
    };
};
