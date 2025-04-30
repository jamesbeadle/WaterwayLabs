module TeamMemberQueries = {
    public type GetTeamMembers = {
        page : Nat;
    };

    public type TeamMembers = {
        teamMember : [TeamMember];
        page : Nat;
        totalEntries : Nat;
    };

    public type TeamMember = {
        firstName : Text;
        lastName : Text;
        image : Blob;
        bio : [Text];
        video : ?Blob;
        jobTitle : Text;
    };
};
