import Ids "mo:waterway-mops/Ids";
import WWLIds "mo:waterway-mops/WWLIds";
import Enums "../enums/enums";
import MopsEnums "mo:waterway-mops/Enums";

module ProjectQueries {

    public type GetProjects = {

    };

    public type Projects = {
        projects : [Project];
    };

    public type Project = {
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
};
