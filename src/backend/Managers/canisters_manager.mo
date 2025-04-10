import Result "mo:base/Result";
import Array "mo:base/Array";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import CanisterQueries "../queries/canister_queries";
import MopsEnums "mo:waterway-mops/Enums";

module {
    public class CanistersManager() {

        private var projects : [AppTypes.Project] = [{
            id = 0;
            name = "ICFC";
            backendCanisterId = "bkyz2-fmaaa-aaaaa-qaaaq-cai";
            frontendCanisterId = "";
            websiteURL = "https://icfc.xyz";
            githubLink = "";
            socialLinks = [];
            status = #Live;
            description = "ICFC is a fantasy football game that allows users to create their own teams and compete against each other.";
            summary = "ICFC is a fantasy football game that allows users to create their own teams and compete against each other.";
            mainColour = "#FF0000";
            secondaryColour = "#00FF00";
            thirdColour = "#0000FF";
            app = #ICFC;
        }];
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
                        getProjectCanisters : () -> async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error>;
                    };
                    let canistersResult = await appCanister.getProjectCanisters();
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

        public func getProjects(_ : ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
            return #ok({
                projects = projects;
            });
        };

        public func createProject(_ : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func setProjectOnHold(_ : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func removeProjectOnHold(_ : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func updateVersion(_ : ProjectCommands.UpdateProjectVersion) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        //update version

    };
};
