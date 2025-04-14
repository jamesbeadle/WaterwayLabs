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
import Array "mo:base/Array";
import Utils "../lib/Utils";

module {
    public class CanistersManager() {
        let wwlCanisterManager = WWLCanisterManager.CanisterManager();
        private var canistersCyclesTopups : [AppTypes.CanisterCyclesTopup] = [];

        public func getCanisterInfo(dto_query : CanisterQueries.GetCanisterInfo) : async Result.Result<CanisterQueries.CanisterInfo, MopsEnums.Error> {

            let result = await wwlCanisterManager.getCanisterInfo(dto_query, dto_query.app);
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

        public func deleteCanister(dto : WWLCanisterCommands.DeleteCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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

        public func takeCanisterSnapshot(dto : WWLCanisterCommands.TakeCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<WWLCanisterCommands.CanisterSnapshot, MopsEnums.Error> {
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

        public func loadCanisterSnapshot(dto : WWLCanisterCommands.LoadCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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

        public func deleteCanisterSnapshot(dto : WWLCanisterCommands.DeleteCanisterSnapshot, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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

        public func startCanister(dto : WWLCanisterCommands.StartCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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

        public func stopCanister(dto : WWLCanisterCommands.StopCanister, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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
                    let command : WWLCanisterCommands.AddController = {
                        app = dto.app;
                        canisterId = dto.canisterId;
                        controller = dto.controller;
                    };
                    if (dto.canisterType == #Static) {
                        let res = await wwlCanisterManager.addController(command);
                        switch (res) {
                            case (#ok(())) {
                                return #ok(());
                            };
                            case (#err(err)) {
                                return #err(err);
                            };
                        };
                    } else if (dto.canisterType == #Dynamic) {
                        let appCanister = actor (project.backendCanisterId) : actor {
                            addController : (dto : WWLCanisterCommands.AddController) -> async Result.Result<(), MopsEnums.Error>;
                        };

                        let addResult = await appCanister.addController(command);
                        switch (addResult) {
                            case (#ok(())) {
                                return #ok(());
                            };
                            case (#err(err)) {
                                return #err(err);
                            };
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
                    let command : WWLCanisterCommands.RemoveController = {
                        app = dto.app;
                        canisterId = dto.canisterId;
                        controller = dto.controller;
                    };
                    if (dto.canisterType == #Static) {
                        let res = await wwlCanisterManager.removeController(command);
                        switch (res) {
                            case (#ok(())) {
                                return #ok(());
                            };
                            case (#err(err)) {
                                return #err(err);
                            };
                        };
                    } else if (dto.canisterType == #Dynamic) {
                        let appCanister = actor (project.backendCanisterId) : actor {
                            removeController : (dto : WWLCanisterCommands.RemoveController) -> async Result.Result<(), MopsEnums.Error>;
                        };

                        let removeResult = await appCanister.removeController(command);
                        switch (removeResult) {
                            case (#ok(())) {
                                return #ok(());
                            };
                            case (#err(err)) {
                                return #err(err);
                            };
                        };
                    };
                };
                case (null) {};
            };
            return #err(#NotFound);
        };
        public func setComputeAllocation(dto : WWLCanisterCommands.SetComputeAllocation, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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
        public func setMemoryAllocation(dto : WWLCanisterCommands.SetMemoryAllocation, projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async Result.Result<(), MopsEnums.Error> {
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

        public func checkCanisters(projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)]) : async () {
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
