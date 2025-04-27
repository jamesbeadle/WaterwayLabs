import Ids "mo:waterway-mops/Ids";
import WWLIds "mo:waterway-mops/WWLIds";
module TeamMemberCommands = {

    public type AddTeamMember = {
        firstName : Text;
        lastName : Text;
        principalId : Ids.PrincipalId;
        jobTitle : Text;
        bio : [Text];
        image : Blob;
        video : ?Blob;
    };

    public type UpdateTeamMember = {
        id : WWLIds.TeamMemberId;
        firstName : Text;
        lastName : Text;
        principalId : Ids.PrincipalId;
        jobTitle : Text;
        bio : [Text];
        image : Blob;
        video : ?Blob;
    };

    public type RemoveTeamMember = {
        id : WWLIds.TeamMemberId;
    };
};
