import Result "mo:base/Result";
import TrieMap "mo:base/TrieMap";
import AppTypes "../types/app_types";
import CanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import MopsEnums "mo:waterway-mops/Enums";
import WWLCanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import WWLCanisterManager "mo:waterway-mops/canister-management/CanisterManager";
import CanisterCommands "../commands/canister_management_commands";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Utils "../lib/Utils";

module {
    public class CanistersManager() {
        let wwlCanisterManager = WWLCanisterManager.CanisterManager();
        private var canistersCyclesTopups : [AppTypes.CanisterCyclesTopup] = [];

        public func getCanisterInfo(dto_query : CanisterQueries.GetCanisterInfo) : async Result.Result<CanisterQueries.CanisterInfo, MopsEnums.Error> {

            let #ok(canister) = await wwlCanisterManager.getCanisterInfo(dto_query, dto_query.app) else {
                return #err(#NotFound);
            };
            return #ok(canister);
        };

        public func getProjectCanisters(dto : CanisterQueries.GetProjectCanisters, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {
            let ?project = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };

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

        public func listCanisterSnapshots(dto : CanisterQueries.ListCanisterSnapshots, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<[CanisterQueries.CanisterSnapshot], MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.listCanisterSnapshots(dto);
        };

        public func deleteCanister(dto : WWLCanisterCommands.DeleteCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.deleteCanister(dto);
        };

        public func takeCanisterSnapshot(dto : WWLCanisterCommands.TakeCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<WWLCanisterCommands.CanisterSnapshot, MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.takeCanisterSnapshot(dto);
        };

        public func loadCanisterSnapshot(dto : WWLCanisterCommands.LoadCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.loadCanisterSnapshot(dto);
        };

        public func deleteCanisterSnapshot(dto : WWLCanisterCommands.DeleteCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.deleteCanisterSnapshot(dto);
        };

        public func startCanister(dto : WWLCanisterCommands.StartCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.startCanister(dto);
        };

        public func stopCanister(dto : WWLCanisterCommands.StopCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.stopCanister(dto);
        };

        public func addController(dto : CanisterCommands.AddController, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?project = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };

            let command : WWLCanisterCommands.AddController = {
                app = dto.app;
                canisterId = dto.canisterId;
                controller = dto.controller;
            };
            if (dto.canisterType == #Static) {
                return await wwlCanisterManager.addController(command);
            } else if (dto.canisterType == #Dynamic) {
                let appCanister = actor (project.backendCanisterId) : actor {
                    addController : (dto : WWLCanisterCommands.AddController) -> async Result.Result<(), MopsEnums.Error>;
                };
                return await appCanister.addController(command);
            };

            return #err(#InvalidData);
        };

        public func removeController(dto : CanisterCommands.RemoveController, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?project = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };

            let command : WWLCanisterCommands.RemoveController = {
                app = dto.app;
                canisterId = dto.canisterId;
                controller = dto.controller;
            };
            if (dto.canisterType == #Static) {
                return await wwlCanisterManager.removeController(command);

            } else if (dto.canisterType == #Dynamic) {
                let appCanister = actor (project.backendCanisterId) : actor {
                    removeController : (dto : WWLCanisterCommands.RemoveController) -> async Result.Result<(), MopsEnums.Error>;
                };
                return await appCanister.removeController(command);
            };

            return #err(#InvalidData);
        };

        public func setComputeAllocation(dto : WWLCanisterCommands.SetComputeAllocation, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.setComputeAllocation(dto);
        };

        public func setMemoryAllocation(dto : WWLCanisterCommands.SetMemoryAllocation, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.setMemoryAllocation(dto);
        };
        public func setFreezingThreshold(dto : WWLCanisterCommands.SetFreezingThreshold, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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
        public func topupCanister(dto : WWLCanisterCommands.TopupCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };

            return await wwlCanisterManager.topupCanister(dto);
        };

        public func checkCanisters(projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async () {
            // TODO: In-Progress
            var canisters : [CanisterQueries.CanisterInfo] = [];
            Debug.print("Checking canisters");
            for (project in Iter.fromArray(projects)) {
                let res = await getProjectCanisters({ app = project.0 }, projects);
                switch (res) {
                    case (#ok(canistersResult)) {
                        let projectCanisters = canistersResult.entries;
                        // canisters := Array.append(canisters, projectCanisters);
                    };
                    case (#err(_)) {
                        Debug.print("Error getting canisters");
                    };
                };
            };

            for (canister in Iter.fromArray(canisters)) {
                // check the canister status
                let canisterStatus = canister.canisterStatus;
                switch (canisterStatus) {
                    case (#running) {
                        let idleCyclesBurnedPerDay = canister.idleCyclesBurnedPerDay;
                        let cycles = canister.cycles;
                        let freezeThreshold = canister.freezeThreshold;
                        let computeAllocation = canister.computeAllocation;

                        let min_cycles_required = Utils.secondsToDays(freezeThreshold) * idleCyclesBurnedPerDay;

                    };
                    case (_) {};
                };
            };

        };

        public func getStableCanisterCyclesTopups() : [AppTypes.CanisterCyclesTopup] {
            return canistersCyclesTopups;
        };

        public func setStableCanisterCyclesTopups(stable_canisters_cycles_topups : [AppTypes.CanisterCyclesTopup]) {
            canistersCyclesTopups := stable_canisters_cycles_topups;
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
