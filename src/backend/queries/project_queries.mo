import MopsIds "mo:waterway-mops/Ids";
import Enums "../enums/enums";
import MopsEnums "mo:waterway-mops/Enums";

module ProjectQueries {

    public type GetProjects = {

    };

    public type Projects = {
        projects : [Project];
    };

    public type Project = {
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
        app : MopsEnums.WaterwayLabsApp;
    };
};
