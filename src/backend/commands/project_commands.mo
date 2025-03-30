import Enums "../enums/enums";
import MopsIds "../cleanup/mops_ids";

module ProjectCommands {

    public type CreateProject = {
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
    };

    public type UpdateProject = {
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
    };

    public type SetProjectOnHold = {
        projectId: MopsIds.ProjectId;
    };

    public type RemoveProjectOnHold = {
        projectId: MopsIds.ProjectId;
    };

    public type UpdateProjectVersion = {
        projectId: MopsIds.ProjectId;
        version: Text;
    };
}