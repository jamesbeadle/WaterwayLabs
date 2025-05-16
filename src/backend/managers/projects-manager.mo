import Result "mo:base/Result";
import Option "mo:base/Option";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import Nat16 "mo:base/Nat16";
import AppTypes "../types";
import ProjectQueries "../queries/project-queries";
import ProjectCommands "../commands/project-commands";
import BaseEnums "mo:waterway-mops/base/enums";
import AppEnums "mo:waterway-mops/product/wwl/enums";
import Utils "../utilities";

module {
    public class ProjectsManager() {
        
        private var projects : TrieMap.TrieMap<AppEnums.WaterwayLabsApp, AppTypes.Project> = TrieMap.TrieMap<AppEnums.WaterwayLabsApp, AppTypes.Project>(Utils.appEquals, Utils.appHash);
        private var project_id : Nat16 = 0;

        public func getProjects(_ : ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, BaseEnums.Error> {
            let projects_arr = Iter.toArray(projects.vals());
            return #ok({
                projects = projects_arr;
            });
        };

        public func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), BaseEnums.Error> {

            let ?_ = projects.get(dto.app) else {
                let project : AppTypes.Project = {
                    id = project_id;
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

                projects.put(dto.app, project);
                project_id := project_id + 1;
                return #ok(());
            };
            return #err(#AlreadyExists);

        };

        public func deleteProject(dto : ProjectCommands.DeleteProject) : async Result.Result<(), BaseEnums.Error> {
            let ?_ = projects.get(dto.app) else {
                return #err(#NotFound);
            };
            projects.delete(dto.app);
            return #ok(());
        };

        public func updateProject(dto : ProjectCommands.UpdateProject) : async Result.Result<(), BaseEnums.Error> {
            let ?existingProject = projects.get(dto.app) else {
                return #err(#NotFound);
            };

            let updatedProject : AppTypes.Project = {
                id = existingProject.id;
                name = Option.get(dto.name, existingProject.name);
                backendCanisterId = Option.get(dto.backendCanisterId, existingProject.backendCanisterId);
                frontendCanisterId = Option.get(dto.frontendCanisterId, existingProject.frontendCanisterId);
                websiteURL = Option.get(dto.websiteURL, existingProject.websiteURL);
                githubLink = Option.get(dto.githubLink, existingProject.githubLink);
                socialLinks = Option.get(dto.socialLinks, existingProject.socialLinks);
                status = Option.get(dto.status, existingProject.status);
                description = Option.get(dto.description, existingProject.description);
                summary = Option.get(dto.summary, existingProject.summary);
                mainColour = Option.get(dto.mainColour, existingProject.mainColour);
                secondaryColour = Option.get(dto.secondaryColour, existingProject.secondaryColour);
                thirdColour = Option.get(dto.thirdColour, existingProject.thirdColour);
                app = existingProject.app;
            };

            projects.put(dto.app, updatedProject);

            return #ok(());
        };

        public func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), BaseEnums.Error> {
            let ?existingProject = projects.get(dto.app) else {
                return #err(#NotFound);
            };

            let updatedProject : AppTypes.Project = {
                id = existingProject.id;
                name = existingProject.name;
                backendCanisterId = existingProject.backendCanisterId;
                frontendCanisterId = existingProject.frontendCanisterId;
                websiteURL = existingProject.websiteURL;
                githubLink = existingProject.githubLink;
                socialLinks = existingProject.socialLinks;
                status = #OnHold;
                description = existingProject.description;
                summary = existingProject.summary;
                mainColour = existingProject.mainColour;
                secondaryColour = existingProject.secondaryColour;
                thirdColour = existingProject.thirdColour;
                app = existingProject.app;
            };

            projects.put(dto.app, updatedProject);

            return #ok(());

        };

        public func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), BaseEnums.Error> {
            let ?existingProject = projects.get(dto.app) else {
                return #err(#NotFound);
            };

            let updatedProject : AppTypes.Project = {
                id = existingProject.id;
                name = existingProject.name;
                backendCanisterId = existingProject.backendCanisterId;
                frontendCanisterId = existingProject.frontendCanisterId;
                websiteURL = existingProject.websiteURL;
                githubLink = existingProject.githubLink;
                socialLinks = existingProject.socialLinks;
                status = #Live;
                description = existingProject.description;
                summary = existingProject.summary;
                mainColour = existingProject.mainColour;
                secondaryColour = existingProject.secondaryColour;
                thirdColour = existingProject.thirdColour;
                app = existingProject.app;
            };

            projects.put(dto.app, updatedProject);

            return #ok(());
        };

        public func getStableProjects() : [(AppEnums.WaterwayLabsApp, AppTypes.Project)] {
            return Iter.toArray(projects.entries());
        };

        public func setStableProjects(stable_projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) {
            let stable_projects_map : TrieMap.TrieMap<AppEnums.WaterwayLabsApp, AppTypes.Project> = TrieMap.TrieMap<AppEnums.WaterwayLabsApp, AppTypes.Project>(Utils.appEquals, Utils.appHash);
            for (project in Iter.fromArray(stable_projects)) {
                stable_projects_map.put(project);
            };
            projects := stable_projects_map;
        };

        public func getStableProjectId() : Nat16 {
            return project_id;
        };

        public func setStableProjectId(stable_project_id : Nat16) {
            project_id := stable_project_id;
        };

    };
};
