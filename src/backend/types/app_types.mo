import MopsIds "mops_ids";
import Enums "../enums/enums";
module AppTypes {


    public type Project = {
        id: MopsIds.ProjectId;
        name: Text;
        backendCanisterId: MopsIds.CanisterId;
        frontendCanisterId: MopsIds.CanisterId;
        websiteURL: Text;
        githubLink: Text;
        socialLinks: [(Text,Text)];
        status: Enums.ProjectStatus;
        description: Text;
        summary: Text;
        mainColour: Text;
        secondaryColour: Text;
        thirdColour: Text;
        app: Enums.WaterwayLabsApp;
    };

    public type SupportQuery = {
        name: Text;
        message: Text;
        contact: Text;
        status: Enums.QueryStatus;
        submittedBy: MopsIds.PrincipalId;
        submittedOn: Int;
        assignedTo: TeamMember;
    };
    
    public type TeamMember = {
        principalId: MopsIds.PrincipalId;
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };
};