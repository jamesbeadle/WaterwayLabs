import MopsEnums "mo:waterway-mops/Enums";
import MopsIds "mo:waterway-mops/Ids";
import WWLIds "mo:waterway-mops/WWLIds";
import MopsTypes "mo:waterway-mops/BaseTypes";
import BaseTypes "mo:waterway-mops/BaseTypes";
import SHA224 "mo:waterway-mops/SHA224";
import BaseUtilities "mo:waterway-mops/BaseUtilities";
/* ----- Mops Packages ----- */

import Array "mo:base/Array";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Text "mo:base/Text";

/* ----- Queries ----- */

import WWLCanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import WWLCanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import LogsQueries "mo:waterway-mops/logs-management/LogsQueries";
import DataHashQueries "queries/data_hash_queries";
import ProjectQueries "queries/project_queries";
import SupportQueryQueries "queries/support_query_queries";
import TeamMemberQueries "queries/team_member_queries";

/* ----- Commands ----- */

import SupportQueryCommands "commands/support_query_commands";
import ProjectCommands "commands/project_commands";
import TeamMemberCommands "commands/team_member_commands";
import LogsCommands "mo:waterway-mops/logs-management/LogsCommands";
import CanisterCommands "./commands/canister_management_commands";

/* ----- Managers ----- */

import ApplicationLogsManager "Managers/application_logs_manager";
import CanistersManager "Managers/canisters_manager";
import DataHashesManager "Managers/data_hashes_manager";
import ProjectsManager "Managers/projects_manager";
import SupportQueriesManager "Managers/support_queries_manager";
import TeamMembersManager "Managers/team_members_manager";

/* ----- Only Stable Variables Should Use Types ----- */

import AppTypes "types/app_types";

/* ----- Application Environment & Utility Files ----- */

import Environment "environment";

actor Self {

    /* ----- Stable Canister Variables ----- */

    private stable var stable_data_hashes : [MopsTypes.DataHash] = [];
    private stable var stable_projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)] = [];
    private stable var stable_team_members : [AppTypes.TeamMember] = [];
    private stable var stable_application_logs : [MopsTypes.ApplicationLog] = [];
    private stable var stable_support_queries : [AppTypes.SupportQuery] = [];
    private stable var stable_canisters_cycles_topups : [AppTypes.CanisterCyclesTopup] = [];
    private stable var stable_project_id : WWLIds.ProjectId = 1;
    private stable var stable_app_status : MopsTypes.AppStatus = {
        onHold = true;
        version = "";
    };
    private stable var stable_canisters_check_timer_id : Nat = 0;
    private stable var stable_support_query_id : WWLIds.SupportQueryId = 1;

    /* ----- Domain Object Managers ----- */

    let dataHashesManager = DataHashesManager.DataHashesManager();
    let projectsManager = ProjectsManager.ProjectsManager();
    let teamMembersManager = TeamMembersManager.TeamMembersManager();
    let applicationLogsManager = ApplicationLogsManager.ApplicationLogsManager();
    let supportQueriesManager = SupportQueriesManager.SupportQueriesManager();
    let canistersManager = CanistersManager.CanistersManager();

    /* ----- General App Queries ----- */

    public shared query func getAppStatus() : async Result.Result<BaseTypes.AppStatus, MopsEnums.Error> {
        return #ok(stable_app_status);
    };

    /* ----- Data Hash Queries ----- */

    public shared query func getDataHashes(dto : DataHashQueries.GetDataHashes) : async Result.Result<DataHashQueries.DataHashes, MopsEnums.Error> {
        return dataHashesManager.getDataHashes(dto);
    };

    /* ----- Projects Queries ----- */

    public query func getProjects(dto : ProjectQueries.GetProjects) : async Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
        return projectsManager.getProjects(dto);
    };

    /* ----- Projects Commands ----- */

    public shared ({ caller }) func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await projectsManager.createProject(dto);
    };

    public shared ({ caller }) func updateProject(dto : ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await projectsManager.updateProject(dto);
    };

    public shared ({ caller }) func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await projectsManager.setProjectOnHold(dto);
    };

    public shared ({ caller }) func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await projectsManager.removeProjectOnHold(dto);
    };

    public shared ({ caller }) func deleteProject(dto : ProjectCommands.DeleteProject) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await projectsManager.deleteProject(dto);
    };

    /* ----- Team Member Queries ----- */

    public shared query func getTeamMembers() : async Result.Result<[TeamMemberQueries.TeamMember], MopsEnums.Error> {
        return #ok(stable_team_members);
    };

    /* ----- Team Member Commands ----- */

    public shared ({ caller }) func addTeamMember(dto : TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await teamMembersManager.addTeamMember(dto);
    };

    public shared ({ caller }) func removeTeamMember(dto : TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await teamMembersManager.removeTeamMember(dto);
    };

    /* ----- Canisters Queries ----- */

    public shared ({ caller }) func getProjectCanisters(dto : WWLCanisterQueries.GetProjectCanisters) : async Result.Result<WWLCanisterQueries.ProjectCanisters, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.getProjectCanisters(dto, projects);
    };

    public shared ({ caller }) func getCanisterInfo(dto : WWLCanisterQueries.GetCanisterInfo) : async Result.Result<WWLCanisterQueries.CanisterInfo, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        return await canistersManager.getCanisterInfo(dto);
    };

    public shared ({ caller }) func listCanisterSnapshots(dto : WWLCanisterQueries.ListCanisterSnapshots) : async Result.Result<[WWLCanisterQueries.CanisterSnapshot], MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.listCanisterSnapshots(dto, projects);
    };

    /* ----- Canisters Commands ----- */

    public shared ({ caller }) func topupCanister(dto : WWLCanisterCommands.TopupCanister) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.topupCanister(dto, projects);
    };

    public shared ({ caller }) func setCanisterComputeAllocation(dto : WWLCanisterCommands.SetComputeAllocation) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setComputeAllocation(dto, projects);
    };

    public shared ({ caller }) func setCanisterMemoryAllocation(dto : WWLCanisterCommands.SetMemoryAllocation) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setMemoryAllocation(dto, projects);
    };

    public shared ({ caller }) func setCanisterFreezeThreshold(dto : WWLCanisterCommands.SetFreezingThreshold) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setFreezingThreshold(dto, projects);
    };

    public shared ({ caller }) func addCanisterController(dto : CanisterCommands.AddController) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.addController(dto, projects);
    };

    public shared ({ caller }) func removeCanisterController(dto : CanisterCommands.RemoveController) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.removeController(dto, projects);
    };

    public shared ({ caller }) func takeCanisterSnapshot(dto : WWLCanisterCommands.TakeCanisterSnapshot) : async Result.Result<WWLCanisterCommands.CanisterSnapshot, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.takeCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func loadCanisterSnapshot(dto : WWLCanisterCommands.LoadCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.loadCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func deleteCanisterSnapshot(dto : WWLCanisterCommands.DeleteCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.deleteCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func startCanister(dto : WWLCanisterCommands.StartCanister) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.startCanister(dto, projects);
    };

    public shared ({ caller }) func stopCanister(dto : WWLCanisterCommands.StopCanister) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.stopCanister(dto, projects);
    };

    public shared ({ caller }) func deleteCanister(dto : WWLCanisterCommands.DeleteCanister) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.deleteCanister(dto, projects);
    };

    /* ----- Application Log Queries ----- */

    public shared func getApplicationLogs(dto : LogsQueries.GetApplicationLogs) : async Result.Result<LogsQueries.ApplicationLogs, MopsEnums.Error> {
        return await applicationLogsManager.getApplicationLogs(dto);
    };

    /* ----- Application Log Commands ----- */

    public shared ({ caller }) func addApplicationLog(dto : LogsCommands.AddApplicationLog) : async Result.Result<(), MopsEnums.Error> {
        assert isApprovedCanister(Principal.toText(caller));
        let _ = await applicationLogsManager.addApplicationLog(dto);
        return #ok();
    };

    /* ----- Support Query Queries ----- */

    public shared ({ caller }) func getSupportQueries(dto : SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await supportQueriesManager.getSupportQueries(dto);
    };

    public shared ({ caller }) func getArchivedSupportQueries(dto : SupportQueryQueries.GetArchivedSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await supportQueriesManager.getArchivedSupportQueries(dto);
    };

    public shared ({ caller }) func getUserSupportQueries(dto : SupportQueryQueries.GetUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
        assert not Principal.isAnonymous(caller);
        return await supportQueriesManager.getUserSupportQueries(dto);
    };

    public shared ({ caller }) func getArchivedUserSupportQueries(dto : SupportQueryQueries.GetArchivedUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
        assert not Principal.isAnonymous(caller);
        return await supportQueriesManager.getArchivedUserSupportQueries(dto);
    };

    /* ----- Support Query Commands ----- */

    public shared ({ caller }) func createSupportQuery(dto : SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
        assert not Principal.isAnonymous(caller);
        let _ = await supportQueriesManager.createSupportQuery(Principal.toText(caller), dto);
        return #ok();
    };

    public shared ({ caller }) func addSupportQueryComment(dto : SupportQueryCommands.AddSupportQueryComment) : async Result.Result<(), MopsEnums.Error> {
        assert not Principal.isAnonymous(caller);
        let _ = await supportQueriesManager.addSupportQueryComment(Principal.toText(caller), dto);
        return #ok();
    };

    public shared ({ caller }) func removeSupportQuery(dto : SupportQueryCommands.RemoveSupportQuery) : async Result.Result<(), MopsEnums.Error> {
        assert not Principal.isAnonymous(caller);
        let _ = await supportQueriesManager.removeSupportQuery(Principal.toText(caller), dto);
        return #ok();
    };

    public shared ({ caller }) func updateSupportQueryStatus(dto : SupportQueryCommands.UpdateSupportQueryStatus) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        let _ = await supportQueriesManager.updateSupportQueryStatus(dto);
        return #ok();
    };

    public shared ({ caller }) func isAdmin() : async Bool {
        return isCallerAdmin(Principal.toText(caller));
    };

    /* ----- Private Motoko Actor Functions ----- */

    private func isApprovedCanister(callerPrincipalId : MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>(
            Environment.APPROVED_CANISTERS,
            func(canisterId : MopsIds.CanisterId) : Bool {
                Text.equal(canisterId, callerPrincipalId);
            },
        );

        return Option.isSome(approvedCaller);
    };

    private func isCallerAdmin(callerPrincipalId : MopsIds.PrincipalId) : Bool {
        if (Principal.isAnonymous(Principal.fromText(callerPrincipalId))) {
            return false;
        };
        let approvedCaller = Array.find<MopsIds.PrincipalId>(
            Environment.ADMIN_PRINCIPAL_IDS,
            func(principalId : MopsIds.PrincipalId) : Bool {
                Text.equal(principalId, callerPrincipalId);
            },
        );

        return Option.isSome(approvedCaller);
    };

    /* ----- Canister Lifecycle Management ----- */

    system func preupgrade() {
        getManagerStableVariables();

        if (stable_canisters_check_timer_id != 0) {
            Timer.cancelTimer(stable_canisters_check_timer_id);
        };
    };

    system func postupgrade() {
        setManagerStableVariables();
        // stable_canisters_check_timer_id := Timer.recurringTimer<system>(#seconds(86_400), checkCanisters);
        ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
    };

    private func getManagerStableVariables() {
        stable_data_hashes := dataHashesManager.getStableDataHashes();
        stable_projects := projectsManager.getStableProjects();
        stable_team_members := teamMembersManager.getStableTeamMembers();
        stable_application_logs := applicationLogsManager.getStableApplicationLogs();
        stable_support_queries := supportQueriesManager.getStableSupportQueries();
        stable_canisters_cycles_topups := canistersManager.getStableCanisterCyclesTopups();
        stable_project_id := projectsManager.getStableProjectId();
        stable_support_query_id := supportQueriesManager.getStableSupportQueryId();
    };

    private func setManagerStableVariables() {
        dataHashesManager.setStableDataHashes(stable_data_hashes);
        projectsManager.setStableProjects(stable_projects);
        teamMembersManager.setStableTeamMembers(stable_team_members);
        applicationLogsManager.setStableApplicationLogs(stable_application_logs);
        supportQueriesManager.setStableSupportQueries(stable_support_queries);
        canistersManager.setStableCanisterCyclesTopups(stable_canisters_cycles_topups);
        projectsManager.setStableProjectId(stable_project_id);
        supportQueriesManager.setStableSupportQueryId(stable_support_query_id);
    };

    private func postUpgradeCallback() : async () {
        dataHashesManager.setStableDataHashes([
            {
                category = "projects";
                hash = await SHA224.getRandomHash();
            },
            {
                category = "team_members";
                hash = await SHA224.getRandomHash();
            },
        ]);
    };

    private func checkCanisters() : async () {
        await canistersManager.checkCanisters(stable_projects);
    };

};
