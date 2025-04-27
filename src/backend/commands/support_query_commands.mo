
import Enums "../enums/app_enums";
import MopsIds "mo:waterway-mops/Ids";
module AppCommands {

    public type CreateSupportQuery = {
        contact : Text;
        message : Text;
        name : Text;
    };

    public type ArchiveSupportQuery = {
        //TODO
    };

    public type AssignSupportQueryToTeamMember = {
        supportQueryId: MopsIds.SupportQueryId;
        teamMemberId: MopsIds.TeamMemberId;
        assignedOn: Int;
    };

    public type UpdateSupportQueryStatus = {
        supportQueryId: MopsIds.SupportQueryId;
        updatedStatus: Enums.SupportQueryStatus;
    };

    public type AddSupportQueryComment = {
        supportQueryId: MopsIds.SupportQueryId;
        comment: Text;
    };

    public type RemoveSupportQueryComment = {
        supportQueryId: MopsIds.SupportQueryId;
    };
}