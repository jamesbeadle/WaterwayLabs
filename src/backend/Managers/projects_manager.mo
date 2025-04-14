import Result "mo:base/Result";
import Option "mo:base/Option";
import TrieMap "mo:base/TrieMap";
import Iter "mo:base/Iter";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import MopsEnums "mo:waterway-mops/Enums";
import Utils "../lib/Utils";

module {
    public class ProjectsManager() {
        private var projects : TrieMap.TrieMap<MopsEnums.WaterwayLabsApp, AppTypes.Project> = TrieMap.TrieMap<MopsEnums.WaterwayLabsApp, AppTypes.Project>(Utils.appEquals, Utils.appHash);

        public func getProjects(_ : ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
            let projects_arr = Iter.toArray(projects.vals());
            return #ok({
                projects = projects_arr;
            });
        };

        public func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {

            let existing = projects.get(dto.app);
            switch (existing) {
                case (?_) {
                    return #err(#AlreadyExists);
                };
                case (null) {
                    let project : AppTypes.Project = {
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

                    return #ok(());
                };
            };

        };

        public func deleteProject(dto : ProjectCommands.DeleteProject) : async Result.Result<(), MopsEnums.Error> {
            let project = projects.get(dto.app);
            switch (project) {
                case (?_) {
                    projects.delete(dto.app);
                    return #ok(());
                };
                case (null) {
                    return #err(#NotFound);
                };
            };
        };

        public func updateProject(dto : ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
            let project = projects.get(dto.app);

            switch (project) {
                case (?existingProject) {
                    let updatedProject : AppTypes.Project = {
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
                case (null) {
                    return #err(#NotFound);
                };
            };

        };

        public func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            let project = projects.get(dto.app);
            switch (project) {
                case (?existingProject) {
                    let updatedProject : AppTypes.Project = {
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
                case (null) {
                    return #err(#NotFound);
                };
            };
        };

        public func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            let project = projects.get(dto.app);
            switch (project) {
                case (?existingProject) {
                    let updatedProject : AppTypes.Project = {
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
                case (null) {
                    return #err(#NotFound);
                };
            };
        };

        public func getStableProjects() : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)] {
            return Iter.toArray(projects.entries());
        };
        public func setStableProjects(stable_projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) {
            let stable_projects_map : TrieMap.TrieMap<MopsEnums.WaterwayLabsApp, AppTypes.Project> = TrieMap.TrieMap<MopsEnums.WaterwayLabsApp, AppTypes.Project>(Utils.appEquals, Utils.appHash);
            for (project in Iter.fromArray(stable_projects)) {
                stable_projects_map.put(project);
            };
            projects := stable_projects_map;
        };

    };
};
