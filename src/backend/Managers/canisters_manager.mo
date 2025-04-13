import Result "mo:base/Result";
import Array "mo:base/Array";
import AppTypes "../types/app_types";
import CanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import MopsEnums "mo:waterway-mops/Enums";
import CanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import WWLCanisterManager "mo:waterway-mops/canister-management/CanisterManager";

module {
    public class CanistersManager() {
        let wwlCanisterManager = WWLCanisterManager.CanisterManager();

        public func getCanisterInfo(dto_query : CanisterQueries.GetCanisterInfo) : async Result.Result<CanisterQueries.CanisterInfo, MopsEnums.Error> {

            let dto : CanisterQueries.GetCanisterInfo = {
                canisterId = dto_query.canisterId;
                canisterType = #Dynamic;
                canisterName = "Custom Canister";
            };
            let result = await wwlCanisterManager.getCanisterInfo(dto, #WaterwayLabs);
            switch (result) {
                case (#ok(canisters)) {
                    return #ok({
                        app = #WaterwayLabs;
                        canisterId = dto.canisterId;
                        canisterName = dto.canisterName;
                        canisterType = dto.canisterType;
                        cycles = canisters.cycles;
                        computeAllocation = canisters.computeAllocation;
                        controllers = canisters.controllers;
                        freezeThreshold = canisters.freezeThreshold;
                        memoryAllocation = canisters.memoryAllocation;
                        memoryUsage = canisters.memoryUsage;
                        canisterStatus = canisters.canisterStatus;
                    });
                };
                case (#err(err)) {
                    return #err(err);
                };
            };

            return #err(#NotFound);
        };

        public func getProjectCanisters(dto : CanisterQueries.GetProjectCanisters, projects : [AppTypes.Project]) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {

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

        public func listCanisterSnapshots(dto : CanisterQueries.ListCanisterSnapshots, projects : [AppTypes.Project]) : async Result.Result<[CanisterQueries.CanisterSnapshot], MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.listCanisterSnapshots(dto);
                    switch (res) {
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

        public func deleteCanister(dto : CanisterCommands.DeleteCanister, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.deleteCanister(dto);
                    switch (res) {
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

        public func takeCanisterSnapshot(dto : CanisterCommands.TakeCanisterSnapshot, projects : [AppTypes.Project]) : async Result.Result<CanisterCommands.CanisterSnapshot, MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.takeCanisterSnapshot(dto);
                    switch (res) {
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

        public func loadCanisterSnapshot(dto : CanisterCommands.LoadCanisterSnapshot, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.loadCanisterSnapshot(dto);
                    switch (res) {
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

        public func deleteCanisterSnapshot(dto : CanisterCommands.DeleteCanisterSnapshot, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.deleteCanisterSnapshot(dto);
                    switch (res) {
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

        public func startCanister(dto : CanisterCommands.StartCanister, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.startCanister(dto);
                    switch (res) {
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

        public func stopCanister(dto : CanisterCommands.StopCanister, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.stopCanister(dto);
                    switch (res) {
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

        public func addController(dto : CanisterCommands.AddController, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
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
        public func removeController(dto : CanisterCommands.RemoveController, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
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
        public func setComputeAllocation(dto : CanisterCommands.SetComputeAllocation, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.setComputeAllocation(dto);
                    switch (res) {
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
        public func setMemoryAllocation(dto : CanisterCommands.SetMemoryAllocation, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.setMemoryAllocation(dto);
                    switch (res) {
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
        public func setFreezingThreshold(dto : CanisterCommands.SetFreezingThreshold, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.setFreezingThreshold(dto);
                    switch (res) {
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
        public func topupCanister(dto : CanisterCommands.TopupCanister, projects : [AppTypes.Project]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = Array.find<AppTypes.Project>(
                projects,
                func(foundProject : AppTypes.Project) : Bool {
                    foundProject.app == dto.app;
                },
            );

            switch (projectResult) {
                case (?_) {
                    let res = await wwlCanisterManager.topupCanister(dto);
                    switch (res) {
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

    };
};
