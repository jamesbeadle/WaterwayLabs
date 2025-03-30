import Result "mo:base/Result";
import AppQueries "../queries/app_queries";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import MopsEnums "../cleanup/mops_enums";

module {
    public class ProjectsManager() {


        private var projects: [AppTypes.Project] = [];  
        public func getStableProjects() : [AppTypes.Project] { projects; };
        public func setStableProjects(stable_projects: [AppTypes.Project]) { projects := stable_projects; };

        public func getProjects(dto: ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
            return #ok({
                //TODO 
            });
        };

        public func createProject(dto: ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func updateProject(dto: ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func setProjectOnHold(dto: ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func removeProjectOnHold(dto: ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func updateProjectVersion(dto: ProjectCommands.UpdateProjectVersion) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        //update version
    
    };
};
