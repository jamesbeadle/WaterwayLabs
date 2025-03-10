import BaseTypes "mo:waterway-mops/BaseTypes";
module AppTypes {

    public type Error = {
        #NotFound;
        #AlreadyExists;
    };

    public type ProjectId = Nat16;

    public type Project = {
        id: ProjectId;
        name: Text;
        backendCanisterId: BaseTypes.CanisterId;
        frontendCanisterId: BaseTypes.CanisterId;
        websiteURL: Text;
        githubLink: Text;
        socialLinks: [(Text,Text)];
        status: ProjectStatus;
        description: Text;
        summary: Text;
        mainColour: Text;
        secondaryColour: Text;
        thirdColour: Text;
    };

    public type ProjectStatus = {
        #Design;
        #Development;
        #Beta;
        #Live;
        #Decentralised;
        #OnHold;
        #Cancelled;
        #Complete;
    };

    public type FormSubmission = {
        name: Text;
        message: Text;
        contact: Text;
        status: QueryStatus;
        submittedBy: BaseTypes.PrincipalId;
        submittedOn: Int;
    };

    public type QueryStatus = {
        #Unread;
        #Read;
        #Resolved;
        #Ignored;
        #Flagged;
    };
    
    public type TeamMember = {
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };
};