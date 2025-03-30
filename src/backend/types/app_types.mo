import Enums "../enums/enums";
import MopsWwlIds "../cleanup/mops_wwl_ids";
import MopsIds "../cleanup/mops_ids";
module AppTypes {


    public type Project = {
        id: MopsWwlIds.ProjectId;
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
        id: MopsWwlIds.SupportQueryId;
        name: Text;
        message: Text;
        contact: Text;
        status: Enums.QueryStatus;
        submittedBy: MopsIds.PrincipalId;
        submittedOn: Int;
        assignedTo: TeamMember;
    };
    
    public type TeamMember = {
        id: MopsWwlIds.TeamMemberId;
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };
};