import Enums "../enums/enums";
import MopsIds "mo:waterway-mops/Ids";

module ProjectCommands {

    public type CreateProject = {
        id : MopsIds.ProjectId;
        name : Text;
        backendCanisterId : MopsIds.CanisterId;
        frontendCanisterId : MopsIds.CanisterId;
        websiteURL : Text;
        githubLink : Text;
        socialLinks : [(Text, Text)];
        status : Enums.ProjectStatus;
        description : Text;
        summary : Text;
        mainColour : Text;
        secondaryColour : Text;
        thirdColour : Text;
        app : Enums.WaterwayLabsApp;
    };

    public type UpdateProject = {
        app : Enums.WaterwayLabsApp;
        name : ?Text;
        backendCanisterId : ?MopsIds.CanisterId;
        frontendCanisterId : ?MopsIds.CanisterId;
        websiteURL : ?Text;
        githubLink : ?Text;
        socialLinks : ?[(Text, Text)];
        status : ?Enums.ProjectStatus;
        description : ?Text;
        summary : ?Text;
        mainColour : ?Text;
        secondaryColour : ?Text;
        thirdColour : ?Text;
    };

    public type SetProjectOnHold = {
        app : Enums.WaterwayLabsApp;
    };

    public type RemoveProjectOnHold = {
        app : Enums.WaterwayLabsApp;
    };

    public type UpdateProjectVersion = {
        app : Enums.WaterwayLabsApp;
        version : Text;
    };

    public type DeleteProject = {
        app : Enums.WaterwayLabsApp;
    };
};
