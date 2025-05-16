import AppIds "mo:waterway-mops/product/wwl/ids";
import BaseIds "mo:waterway-mops/base/ids";
import Enums "mo:waterway-mops/product/wwl/enums";

import AppEnums "../enums";

module ProjectCommands {

    public type CreateProject = {
        id : AppIds.ProjectId;
        name : Text;
        backendCanisterId : BaseIds.CanisterId;
        frontendCanisterId : BaseIds.CanisterId;
        websiteURL : Text;
        githubLink : Text;
        socialLinks : [(Text, Text)];
        status : AppEnums.ProjectStatus;
        description : Text;
        summary : Text;
        mainColour : Text;
        secondaryColour : Text;
        thirdColour : Text;
        app : Enums.WaterwayLabsApp;
    };

    public type UpdateProject = {
        id : AppIds.ProjectId;
        app : Enums.WaterwayLabsApp;
        name : ?Text;
        backendCanisterId : ?BaseIds.CanisterId;
        frontendCanisterId : ?BaseIds.CanisterId;
        websiteURL : ?Text;
        githubLink : ?Text;
        socialLinks : ?[(Text, Text)];
        status : ?AppEnums.ProjectStatus;
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
