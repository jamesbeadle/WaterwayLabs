import Result "mo:base/Result";
import Array "mo:base/Array";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import CanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import MopsEnums "mo:waterway-mops/Enums";
import CanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";

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

        public func listCanisterSnapshots(dto : CanisterQueries.ListCanisterSnapshots) : async Result.Result<[CanisterQueries.CanisterSnapshot], MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        listCanisterSnapshots : (dto : CanisterQueries.ListCanisterSnapshots) -> async Result.Result<[CanisterQueries.CanisterSnapshot], MopsEnums.Error>;
                    };
                    let snapshotsResult = await appCanister.listCanisterSnapshots(dto);
                    switch (snapshotsResult) {
                        case (#ok(snapshots)) {
                            return #ok(snapshots);
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

        public func deleteCanister(dto : CanisterCommands.DeleteCanister) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        deleteCanister : (dto : CanisterCommands.DeleteCanister) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let deleteResult = await appCanister.deleteCanister(dto);
                    switch (deleteResult) {
                        case (#ok(())) {
                            return #ok(());
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

        public func takeCanisterSnapshot(dto : CanisterCommands.TakeCanisterSnapshot) : async Result.Result<CanisterCommands.CanisterSnapshot, MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        takeCanisterSnapshot : (dto : CanisterCommands.TakeCanisterSnapshot) -> async Result.Result<CanisterCommands.CanisterSnapshot, MopsEnums.Error>;
                    };
                    let snapshotResult = await appCanister.takeCanisterSnapshot(dto);
                    switch (snapshotResult) {
                        case (#ok(snapshot)) {
                            return #ok(snapshot);
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

        public func loadCanisterSnapshot(dto : CanisterCommands.LoadCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        loadCanisterSnapshot : (dto : CanisterCommands.LoadCanisterSnapshot) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let loadResult = await appCanister.loadCanisterSnapshot(dto);
                    switch (loadResult) {
                        case (#ok(())) {
                            return #ok(());
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

        public func deleteCanisterSnapshot(dto : CanisterCommands.DeleteCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        deleteCanisterSnapshot : (dto : CanisterCommands.DeleteCanisterSnapshot) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let deleteResult = await appCanister.deleteCanisterSnapshot(dto);
                    switch (deleteResult) {
                        case (#ok(())) {
                            return #ok(());
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

        public func startCanister(dto : CanisterCommands.StartCanister) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        startCanister : (dto : CanisterCommands.StartCanister) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let startResult = await appCanister.startCanister(dto);
                    switch (startResult) {
                        case (#ok(())) {
                            return #ok(());
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

        public func stopCanister(dto : CanisterCommands.StopCanister) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        stopCanister : (dto : CanisterCommands.StopCanister) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let stopResult = await appCanister.stopCanister(dto);
                    switch (stopResult) {
                        case (#ok(())) {
                            return #ok(());
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

        public func addController(dto : CanisterCommands.AddController) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        addController : (dto : CanisterCommands.AddController) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let addResult = await appCanister.addController(dto);
                    switch (addResult) {
                        case (#ok(())) {
                            return #ok(());
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
        public func removeController(dto : CanisterCommands.RemoveController) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        removeController : (dto : CanisterCommands.RemoveController) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let removeResult = await appCanister.removeController(dto);
                    switch (removeResult) {
                        case (#ok(())) {
                            return #ok(());
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
        public func setComputeAllocation(dto : CanisterCommands.SetComputeAllocation) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        setComputeAllocation : (dto : CanisterCommands.SetComputeAllocation) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let allocationResult = await appCanister.setComputeAllocation(dto);
                    switch (allocationResult) {
                        case (#ok(())) {
                            return #ok(());
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
        public func setMemoryAllocation(dto : CanisterCommands.SetMemoryAllocation) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        setMemoryAllocation : (dto : CanisterCommands.SetMemoryAllocation) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let allocationResult = await appCanister.setMemoryAllocation(dto);
                    switch (allocationResult) {
                        case (#ok(())) {
                            return #ok(());
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
        public func setFreezingThreshold(dto : CanisterCommands.SetFreezingThreshold) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        setFreezingThreshold : (dto : CanisterCommands.SetFreezingThreshold) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let thresholdResult = await appCanister.setFreezingThreshold(dto);
                    switch (thresholdResult) {
                        case (#ok(())) {
                            return #ok(());
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
        public func topupCanister(dto : CanisterCommands.TopupCanister) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?project) {
                    let appCanister = actor (project.backendCanisterId) : actor {
                        topupCanister : (dto : CanisterCommands.TopupCanister) -> async Result.Result<(), MopsEnums.Error>;
                    };
                    let topupResult = await appCanister.topupCanister(dto);
                    switch (topupResult) {
                        case (#ok(())) {
                            return #ok(());
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
