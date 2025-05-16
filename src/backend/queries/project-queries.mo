import Ids "mo:waterway-mops/base/ids";
import AppIds "mo:waterway-mops/product/wwl/ids";
import Enums "../enums";
import AppEnums "mo:waterway-mops/product/wwl/enums";

module ProjectQueries {

    public type GetProjects = {

    };

    public type Projects = {
        projects : [Project];
    };

    public type Project = {
        id : AppIds.ProjectId;
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
        app : AppEnums.WaterwayLabsApp;
    };
};
