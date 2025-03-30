import MopsIds "../types/mops_ids";

module ProjectCommands {

    public type CreateProject = {
        //TODO 
    };

    public type SetOnHold = {
        projectId: MopsIds.ProjectId;
    };

    public type RemoveOnHold = {
        projectId: MopsIds.ProjectId;
    };

    public type UpdateVersion = {
        projectId: MopsIds.ProjectId;
        version: Text;
    };
}