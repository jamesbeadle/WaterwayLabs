import Enums "../enums/enums";
import MopsIds "mo:waterway-mops/Ids";
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
        id: MopsIds.SupportQueryId;
        name: Text;
        message: Text;
        contact: Text;
        status: Enums.QueryStatus;
        submittedBy: MopsIds.PrincipalId;
        submittedOn: Int;
        assignedTo: TeamMember;
    };
    
    public type TeamMember = {
        id: MopsIds.TeamMemberId;
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };
    
    public type SupportQueryComment = {
        comment: Text;
    };  
};