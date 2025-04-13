import Result "mo:base/Result";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Nat16 "mo:base/Nat16";
import Option "mo:base/Option";
import AppQueries "../queries/app_queries";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import MopsEnums "mo:waterway-mops/Enums"

module {
    public class ProjectsManager() {

        private var projects : [AppTypes.Project] = [];
        public func getStableProjects() : [AppTypes.Project] { projects };
        public func setStableProjects(stable_projects : [AppTypes.Project]) {
            projects := stable_projects;
        };

        public func getProjects(dto : ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
            return #ok({
                projects = projects;
            });
        };

        public func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {

            let project : AppTypes.Project = {
                id = Nat16.fromNat(Array.size(projects));
                name = dto.name;
                backendCanisterId = dto.backendCanisterId;
                frontendCanisterId = dto.frontendCanisterId;
                websiteURL = dto.websiteURL;
                githubLink = dto.githubLink;
                socialLinks = dto.socialLinks;
                status = dto.status;
                description = dto.description;
                summary = dto.summary;
                mainColour = dto.mainColour;
                secondaryColour = dto.secondaryColour;
                thirdColour = dto.thirdColour;
                app = dto.app;
            };

            projects := Array.append(projects, [project]);
            return #ok(());
        };

        public func updateProject(dto : ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
            let projectId = dto.projectId;
            let projectIndex = Option.map<Nat, Nat>(
                Array.find<Nat>(
                    Array.tabulate<Nat>(Array.size(projects), func(i : Nat) : Nat { i }),
                    func(i : Nat) : Bool { projects[i].id == projectId },
                ),
                func(i : Nat) : Nat { i },
            );

            switch (projectIndex) {
                case (?index) {
                    let updatedProject : AppTypes.Project = {
                        id = projectId;
                        name = Option.get(dto.name, projects[index].name);
                        backendCanisterId = Option.get(dto.backendCanisterId, projects[index].backendCanisterId);
                        frontendCanisterId = Option.get(dto.frontendCanisterId, projects[index].frontendCanisterId);
                        websiteURL = Option.get(dto.websiteURL, projects[index].websiteURL);
                        githubLink = Option.get(dto.githubLink, projects[index].githubLink);
                        socialLinks = Option.get(dto.socialLinks, projects[index].socialLinks);
                        status = Option.get(dto.status, projects[index].status);
                        description = Option.get(dto.description, projects[index].description);
                        summary = Option.get(dto.summary, projects[index].summary);
                        mainColour = Option.get(dto.mainColour, projects[index].mainColour);
                        secondaryColour = Option.get(dto.secondaryColour, projects[index].secondaryColour);
                        thirdColour = Option.get(dto.thirdColour, projects[index].thirdColour);
                        app = projects[index].app;
                    };

                    projects := Array.filter<AppTypes.Project>(projects, func(p) { p.id != projectId });
                    projects := Array.append(projects, [updatedProject]);

                    return #ok(());
                };
                case (null) {
                    return #err(#NotFound);
                };
            };
        };

        public func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            let projectId = dto.projectId;
            let projectIndex = Option.map<Nat, Nat>(
                Array.find<Nat>(
                    Array.tabulate<Nat>(Array.size(projects), func(i : Nat) : Nat { i }),
                    func(i : Nat) : Bool { projects[i].id == projectId },
                ),
                func(i : Nat) : Nat { i },
            );

            switch (projectIndex) {
                case (?index) {
                    let updatedProject : AppTypes.Project = {
                        id = projectId;
                        name = projects[index].name;
                        backendCanisterId = projects[index].backendCanisterId;
                        frontendCanisterId = projects[index].frontendCanisterId;
                        websiteURL = projects[index].websiteURL;
                        githubLink = projects[index].githubLink;
                        socialLinks = projects[index].socialLinks;
                        status = #OnHold;
                        description = projects[index].description;
                        summary = projects[index].summary;
                        mainColour = projects[index].mainColour;
                        secondaryColour = projects[index].secondaryColour;
                        thirdColour = projects[index].thirdColour;
                        app = projects[index].app;
                    };

                    projects := Array.filter<AppTypes.Project>(projects, func(p) { p.id != projectId });
                    projects := Array.append(projects, [updatedProject]);

                    return #ok(());
                };
                case (null) {
                    return #err(#NotFound);
                };
            };
        };

        public func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            let projectId = dto.projectId;
            let projectIndex = Option.map<Nat, Nat>(
                Array.find<Nat>(
                    Array.tabulate<Nat>(Array.size(projects), func(i : Nat) : Nat { i }),
                    func(i : Nat) : Bool { projects[i].id == projectId },
                ),
                func(i : Nat) : Nat { i },
            );

            switch (projectIndex) {
                case (?index) {
                    let updatedProject : AppTypes.Project = {
                        id = projectId;
                        name = projects[index].name;
                        backendCanisterId = projects[index].backendCanisterId;
                        frontendCanisterId = projects[index].frontendCanisterId;
                        websiteURL = projects[index].websiteURL;
                        githubLink = projects[index].githubLink;
                        socialLinks = projects[index].socialLinks;
                        status = #Live;
                        description = projects[index].description;
                        summary = projects[index].summary;
                        mainColour = projects[index].mainColour;
                        secondaryColour = projects[index].secondaryColour;
                        thirdColour = projects[index].thirdColour;
                        app = projects[index].app;
                    };

                    projects := Array.filter<AppTypes.Project>(projects, func(p) { p.id != projectId });
                    projects := Array.append(projects, [updatedProject]);

                    return #ok(());
                };
                case (null) {
                    return #err(#NotFound);
                };
            };
        };

        public func updateProjectVersion(dto : ProjectCommands.UpdateProjectVersion) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        //update version

    };
};
