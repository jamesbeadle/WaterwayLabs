import MopsIds "mo:waterway-mops/Ids";
module TeamMemberCommands = {

    public type AddTeamMember = {
        firstName: Text;
        lastName: Text;
        principalId: MopsIds.PrincipalId;
        jobTitle: Text;
        bio: [Text];
        image: Blob;
        video: ?Blob;
    };

    public type UpdateTeamMember = {
        id: MopsIds.TeamMemberId;
        firstName: Text;
        lastName: Text;
        principalId: MopsIds.PrincipalId;
        jobTitle: Text;
        bio: [Text];
        image: Blob;
        video: ?Blob;
    };

    public type RemoveTeamMember = {
        id: MopsIds.TeamMemberId;
    };
};