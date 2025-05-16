import Result "mo:base/Result";
import TrieMap "mo:base/TrieMap";
import AppTypes "../types";
import CanisterQueries "mo:waterway-mops/product/wwl/canister-management/queries";
import Enums "mo:waterway-mops/base/enums";
import AppEnums "mo:waterway-mops/product/wwl/enums";
import WWLCanisterCommands "mo:waterway-mops/product/wwl/canister-management/commands";
import WWLCanisterManager "mo:waterway-mops/product/wwl/canister-management/manager";
import { message } "mo:base/Error";
import LogManager "mo:waterway-mops/product/wwl/log-management/manager";
import CanisterIds "mo:waterway-mops/product/wwl/canister-ids";
import CanisterCommands "../commands/canister-management-commands";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Utilities "../utilities";

module {
    public class CanistersManager() {
        let wwlCanisterManager = WWLCanisterManager.CanisterManager();
        let logsManager = LogManager.LogManager();
        private var canistersCyclesTopups : [AppTypes.CanisterCyclesTopup] = [];

        public func getCanisterInfo(dto_query : CanisterQueries.GetCanisterInfo) : async Result.Result<CanisterQueries.CanisterInfo, Enums.Error> {
            return await wwlCanisterManager.getCanisterInfo(dto_query, dto_query.app);
        };

        public func getProjectCanisters(dto : CanisterQueries.GetProjectCanisters, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<CanisterQueries.ProjectCanisters, Enums.Error> {
            let ?project = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };

            let appCanister = actor (project.backendCanisterId) : actor {
                getProjectCanisters : () -> async Result.Result<CanisterQueries.ProjectCanisters, Enums.Error>;
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

        public func listCanisterSnapshots(dto : CanisterQueries.ListCanisterSnapshots, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<[CanisterQueries.CanisterSnapshot], Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.listCanisterSnapshots(dto);
        };

        public func deleteCanister(dto : WWLCanisterCommands.DeleteCanister, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.deleteCanister(dto);
        };

        public func takeCanisterSnapshot(dto : WWLCanisterCommands.TakeCanisterSnapshot, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<WWLCanisterCommands.CanisterSnapshot, Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.takeCanisterSnapshot(dto);
        };

        public func loadCanisterSnapshot(dto : WWLCanisterCommands.LoadCanisterSnapshot, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.loadCanisterSnapshot(dto);
        };

        public func deleteCanisterSnapshot(dto : WWLCanisterCommands.DeleteCanisterSnapshot, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.deleteCanisterSnapshot(dto);
        };

        public func startCanister(dto : WWLCanisterCommands.StartCanister, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.startCanister(dto);
        };

        public func stopCanister(dto : WWLCanisterCommands.StopCanister, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.stopCanister(dto);
        };

        public func addController(dto : CanisterCommands.AddController, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
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
                    addController : (dto : WWLCanisterCommands.AddController) -> async Result.Result<(), Enums.Error>;
                };
                return await appCanister.addController(command);
            };

            return #err(#InvalidData);
        };

        public func removeController(dto : CanisterCommands.RemoveController, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
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
                    removeController : (dto : WWLCanisterCommands.RemoveController) -> async Result.Result<(), Enums.Error>;
                };
                return await appCanister.removeController(command);
            };

            return #err(#InvalidData);
        };

        public func setComputeAllocation(dto : WWLCanisterCommands.SetComputeAllocation, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.setComputeAllocation(dto);
        };

        public func setMemoryAllocation(dto : WWLCanisterCommands.SetMemoryAllocation, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };
            return await wwlCanisterManager.setMemoryAllocation(dto);
        };
        public func setFreezingThreshold(dto : WWLCanisterCommands.SetFreezingThreshold, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
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
        public func topupCanister(dto : WWLCanisterCommands.TopupCanister, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), Enums.Error> {
            let ?_ = getProject(dto.app, projects) else {
                return #err(#NotFound);
            };

            return await wwlCanisterManager.topupCanister(dto);
        };

        public func checkCanisters(projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : async () {
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

        private func getProject(app : AppEnums.WaterwayLabsApp, projects : [(AppEnums.WaterwayLabsApp, AppTypes.Project)]) : ?AppTypes.Project {
            let projectsMap : TrieMap.TrieMap<AppEnums.WaterwayLabsApp, AppTypes.Project> = TrieMap.TrieMap<AppEnums.WaterwayLabsApp, AppTypes.Project>(Utilities.appEquals, Utilities.appHash);

            for (project in Iter.fromArray(projects)) {
                projectsMap.put(project);
            };

            return projectsMap.get(app);
        };

    };
};
