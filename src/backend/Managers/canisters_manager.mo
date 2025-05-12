import Result "mo:base/Result";
import TrieMap "mo:base/TrieMap";
import AppTypes "../types/app_types";
import CanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import MopsEnums "mo:waterway-mops/Enums";
import WWLCanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import WWLCanisterManager "mo:waterway-mops/canister-management/CanisterManager";
import { message } "mo:base/Error";
import LogsManager "mo:waterway-mops/logs-management/LogsManager";
import CanisterIds "mo:waterway-mops/CanisterIds";
import CanisterCommands "../commands/canister_management_commands";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Utils "../lib/Utils";

module {
    public class CanistersManager() {
        let wwlCanisterManager = WWLCanisterManager.CanisterManager();
        let logsManager = LogsManager.LogsManager();
        private var canistersCyclesTopups : [AppTypes.CanisterCyclesTopup] = [];

        public func getCanisterInfo(dto_query : CanisterQueries.GetCanisterInfo) : async Result.Result<CanisterQueries.CanisterInfo, MopsEnums.Error> {
            return await wwlCanisterManager.getCanisterInfo(dto_query, dto_query.app);
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
            try {
                var canisters : [CanisterQueries.Canister] = [];
                Debug.print("Checking canisters");

                let _ = await logsManager.addApplicationLog({
                    app = #WaterwayLabs;
                    logType = #Information;
                    title = "CanistersManager";
                    detail = "Checking canisters";
                    error = null;
                });
                for (project in Iter.fromArray(projects)) {
                    let res = await getProjectCanisters({ app = project.0 }, projects);
                    switch (res) {
                        case (#ok(canistersResult)) {
                            let projectCanisters = canistersResult.entries;
                            canisters := Array.append(canisters, projectCanisters);
                        };
                        case (#err(_)) {
                            Debug.print("Error getting canisters");
                        };
                    };
                };

                label canisterLoop for (canister in Iter.fromArray(canisters)) {
                    let canisterId = canister.canisterId;
                    let app = canister.app;
                    let canisterResult = await getCanisterInfo({
                        canisterId = canisterId;
                        app = app;
                    });

                    switch (canisterResult) {
                        case (#ok(canisterInfo)) {
                            let cycles = canisterInfo.cycles;
                            let idleCyclesBurnedPerDay = canisterInfo.idleCyclesBurnedPerDay;

                            var requiredCycles = idleCyclesBurnedPerDay * 31;
                            if (cycles > requiredCycles) {
                                continue canisterLoop;
                            };

                            let wwlbackendCanisterResult = await getCanisterInfo({
                                canisterId = CanisterIds.WATERWAY_LABS_BACKEND_CANISTER_ID;
                                app = app;
                            });

                            switch (wwlbackendCanisterResult) {
                                case (#ok(wwlCanisterInfo)) {
                                    let wwlCycles = wwlCanisterInfo.cycles;
                                    if (wwlCycles < requiredCycles) {
                                        Debug.print("Not enough cycles in WWL canister");
                                        let _ = await logsManager.addApplicationLog({
                                            app = #WaterwayLabs;
                                            logType = #Error;
                                            title = "CanistersManager";
                                            detail = "Not enough cycles in WWL canister";
                                            error = null;
                                        });
                                        break canisterLoop;
                                    };
                                };

                                case (#err(_)) {
                                    Debug.print("Error getting WWL canister info");
                                    let _ = await logsManager.addApplicationLog({
                                        app = #WaterwayLabs;
                                        logType = #Error;
                                        title = "CanistersManager";
                                        detail = "Error getting WWL canister info";
                                        error = null;
                                    });
                                    break canisterLoop;
                                };
                            };

                            let topup = {
                                app = app;
                                canisterId = canisterId;
                                cycles = requiredCycles;
                            };
                            let _ = await topupCanister(topup, projects);
                            canistersCyclesTopups := Array.append(canistersCyclesTopups, [{ app = app; canisterId = canisterId; amount = requiredCycles; time = Time.now() }]);

                        };

                        case (#err(err)) {
                            Debug.print("Error getting canister info");
                            let _ = await logsManager.addApplicationLog({
                                app = #WaterwayLabs;
                                logType = #Error;
                                title = "CanistersManager";
                                detail = "Error getting canister info";
                                error = ?err;
                            });

                            continue canisterLoop;
                        };
                    };
                };

            } catch (err) {
                Debug.print("Error checking canisters");
                let _ = await logsManager.addApplicationLog({
                    app = #WaterwayLabs;
                    logType = #Error;
                    title = "CanistersManager";
                    detail = message(err);
                    error = ?#IncorrectSetup;
                });
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
