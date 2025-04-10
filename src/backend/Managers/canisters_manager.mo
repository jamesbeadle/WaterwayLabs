import Result "mo:base/Result";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import CanisterQueries "../queries/canister_queries";
import Environment "../environment";
import MopsEnums "mo:waterway-mops/Enums";
import Management "mo:waterway-mops/Management";
import MopsCanisterIds "mo:waterway-mops/CanisterIds";
import CanisterUtilities "mo:waterway-mops/CanisterUtilities";
import Ids "mo:waterway-mops/Ids";

module {
    public class CanistersManager() {

        private var projects : [AppTypes.Project] = [];
        public func getStableProjects() : [AppTypes.Project] { projects };
        public func setStableProjects(stable_projects : [AppTypes.Project]) {
            projects := stable_projects;
        };

        public func getProjectCanisters(dto : CanisterQueries.GetProjectCanisters) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {

            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        getCanistersInfo : () -> async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error>;
                    };
                    let canistersResult = await appCanister.getCanistersInfo();
                    switch (canistersResult) {
                        case (#ok(canisters)) {
                            return #ok({
                                entries = canisters.entries;
                            });
                        };
                        case (#err(err)) {
                            return #err(err);
                        };
                    };
                };
                case (null) {};
            };
            return #err(#NotFound);
        };

        public func getProjects(dto : ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
            return #ok({
                projects = projects;
            });
        };

        public func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func updateVersion(dto : ProjectCommands.UpdateProjectVersion) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        //update version

    };
};
