import Base "base_types";

module AppTypes {

    public type Error = {
        #NotFound;
    };

    public type ProjectId = Nat16;

    public type Project = {
        id: ProjectId;
        name: Text;
        backendCanisterId: Base.CanisterId;
        frontendCanisterId: Base.CanisterId;
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
        submittedBy: Base.PrincipalId;
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