import Result "mo:base/Result";
import TrieMap "mo:base/TrieMap";
import AppTypes "../types/app_types";
import CanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import MopsEnums "mo:waterway-mops/Enums";
import CanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import WWLCanisterManager "mo:waterway-mops/canister-management/CanisterManager";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Utils "../lib/Utils";

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
                case (#ok(canister)) {
                    return #ok(canister);
                };
                case (#err(err)) {
                    return #err(err);
                };
            };

            return #err(#NotFound);
        };

        public func getProjectCanisters(dto : CanisterQueries.GetProjectCanisters, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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

        public func listCanisterSnapshots(dto : CanisterQueries.ListCanisterSnapshots, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<[CanisterQueries.CanisterSnapshot], MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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

        public func deleteCanister(dto : CanisterCommands.DeleteCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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

        public func takeCanisterSnapshot(dto : CanisterCommands.TakeCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<CanisterCommands.CanisterSnapshot, MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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

        public func loadCanisterSnapshot(dto : CanisterCommands.LoadCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);
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

        public func deleteCanisterSnapshot(dto : CanisterCommands.DeleteCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);
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

        public func startCanister(dto : CanisterCommands.StartCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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

        public func stopCanister(dto : CanisterCommands.StopCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);
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

        public func addController(dto : CanisterCommands.AddController, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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
        public func removeController(dto : CanisterCommands.RemoveController, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);
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
        public func setComputeAllocation(dto : CanisterCommands.SetComputeAllocation, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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
        public func setMemoryAllocation(dto : CanisterCommands.SetMemoryAllocation, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);

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
        public func setFreezingThreshold(dto : CanisterCommands.SetFreezingThreshold, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);
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
        public func topupCanister(dto : CanisterCommands.TopupCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let projectResult = getProject(dto.app, projects);
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

        public func checkCanisters() : async () {
            Debug.print("Checking canisters");
        };

        private func getProject(app : MopsEnums.WaterwayLabsApp, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : ?AppTypes.Project {
            let projectsMap : TrieMap.TrieMap<MopsEnums.WaterwayLabsApp, AppTypes.Project> = TrieMap.TrieMap<MopsEnums.WaterwayLabsApp, AppTypes.Project>(Utils.appEquals, Utils.appHash);

            for (project in Iter.fromArray(projects)) {
                projectsMap.put(project);
            };

            return projectsMap.get(app);
        };

    };
};
