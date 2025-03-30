
module TeamMemberQueries = {
    public type GetTeamMembers = {
        page: Nat;
    };

    public type TeamMembers = {
        teamMember: [TeamMember];
        page: Nat;
        totalEntries: Nat;
    };

    public type TeamMember = {
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };
}