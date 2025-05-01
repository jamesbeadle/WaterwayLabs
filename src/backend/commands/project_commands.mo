import MopsEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
import WWLIds "mo:waterway-mops/WWLIds";
import Enums "../enums/app_enums";
import AppTypes "../types/app_types";

module ProjectCommands {

    public type CreateProject = {
        id : WWLIds.ProjectId;
        name : Text;
        backendCanisterId : Ids.CanisterId;
        frontendCanisterId : Ids.CanisterId;
        websiteURL : Text;
        githubLink : Text;
        socialLinks : [(Text, Text)];
        status : Enums.ProjectStatus;
        description : Text;
        summary : Text;
        mainColour : Text;
        secondaryColour : Text;
        thirdColour : Text;
        app : MopsEnums.WaterwayLabsApp;
    };

    public type UpdateProject = {
        id : WWLIds.ProjectId;
        app : MopsEnums.WaterwayLabsApp;
        name : ?Text;
        backendCanisterId : ?Ids.CanisterId;
        frontendCanisterId : ?Ids.CanisterId;
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
        app : MopsEnums.WaterwayLabsApp;
    };

    public type RemoveProjectOnHold = {
        app : MopsEnums.WaterwayLabsApp;
    };

    public type UpdateProjectVersion = {
        app : MopsEnums.WaterwayLabsApp;
        version : Text;
    };

    public type DeleteProject = {
        app : MopsEnums.WaterwayLabsApp;
    };
};
