import MopsEnums "mo:waterway-mops/Enums";
import MopsIds "mo:waterway-mops/Ids";
import MopsTypes "mo:waterway-mops/BaseTypes";
import BaseTypes "mo:waterway-mops/BaseTypes";

/* ----- Mops Packages ----- */

import Array "mo:base/Array";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";

/* ----- Queries ----- */

import ApplicationLogQueries "queries/application_log_queries";
import CanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import CanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import DataHashQueries "queries/data_hash_queries";
import ProjectQueries "queries/project_queries";
import SupportQueryQueries "queries/support_query_queries";
import TeamMemberQueries "queries/team_member_queries";

/* ----- Commands ----- */

import ApplicationLogCommands "commands/application_log_commands";
import SupportQueryCommands "commands/support_query_commands";
import ProjectCommands "commands/project_commands";
import TeamMemberCommands "commands/team_member_commands";

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
    private stable var stable_app_status : MopsTypes.AppStatus = {
        onHold = true;
        version = "";
    };
    private stable var stable_canisters_check_timer_id : Nat = 0;

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

    public shared ({ caller }) func getProjects(dto : ProjectQueries.GetProjects) : async Result.Result<ProjectQueries.GetProjects, MopsEnums.Error> {
        assert Principal.isAnonymous(caller);
        return projectsManager.getProjects(dto);
    };

    /* ----- Projects Commands ----- */

    public shared ({ caller }) func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
        assert Principal.isAnonymous(caller);
        return await projectsManager.createProject(dto);
    };

    public shared func updateProject(dto : ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.updateProject(dto);
    };

    public shared func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.setProjectOnHold(dto);
    };

    public shared func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.removeProjectOnHold(dto);
    };

    /* ----- Team Member Queries ----- */

    public shared query func getTeamMembers() : async Result.Result<[TeamMemberQueries.TeamMember], MopsEnums.Error> {
        return #ok(stable_team_members);
    };

    /* ----- Team Member Commands ----- */

    public shared func addTeamMember(dto : TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.addTeamMember(dto);
    };

    public shared func removeTeamMember(dto : TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.removeTeamMember(dto);
    };

    /* ----- Canisters Queries ----- */

    public shared func getProjectCanisters(dto : CanisterQueries.GetProjectCanisters) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        // assert Principal.isAnonymous(caller);
        let projects = projectsManager.getStableProjects();
        return await canistersManager.getProjectCanisters(dto, projects);
    };

    public shared ({ caller }) func getCanisterInfo(dto : CanisterQueries.GetCanisterInfo) : async Result.Result<CanisterQueries.CanisterInfo, MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        return await canistersManager.getCanisterInfo(dto);
    };

    public shared ({ caller }) func listCanisterSnapshots(dto : CanisterQueries.ListCanisterSnapshots) : async Result.Result<[CanisterQueries.CanisterSnapshot], MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.listCanisterSnapshots(dto, projects);
    };

    /* ----- Canisters Commands ----- */

    public shared ({ caller }) func topupCanister(dto : CanisterCommands.TopupCanister) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.topupCanister(dto, projects);
    };

    public shared ({ caller }) func setCanisterComputeAllocation(dto : CanisterCommands.SetComputeAllocation) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setComputeAllocation(dto, projects);
    };

    public shared ({ caller }) func setCanisterMemoryAllocation(dto : CanisterCommands.SetMemoryAllocation) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setMemoryAllocation(dto, projects);
    };

    public shared ({ caller }) func setCanisterFreezeThreshold(dto : CanisterCommands.SetFreezingThreshold) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setFreezingThreshold(dto, projects);
    };

    public shared ({ caller }) func addCanisterController(dto : CanisterCommands.AddController) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.addController(dto, projects);
    };

    public shared ({ caller }) func takeCanisterSnapshot(dto : CanisterCommands.TakeCanisterSnapshot) : async Result.Result<CanisterCommands.CanisterSnapshot, MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.takeCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func loadCanisterSnapshot(dto : CanisterCommands.LoadCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.loadCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func deleteCanisterSnapshot(dto : CanisterCommands.DeleteCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.deleteCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func startCanister(dto : CanisterCommands.StartCanister) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.startCanister(dto, projects);
    };

    public shared ({ caller }) func stopCanister(dto : CanisterCommands.StopCanister) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.stopCanister(dto, projects);
    };

    public shared ({ caller }) func deleteCanister(dto : CanisterCommands.DeleteCanister) : async Result.Result<(), MopsEnums.Error> {
        // assert isCallerAdmin(Principal.toText(caller));
        assert Principal.isAnonymous(caller);

        let projects = projectsManager.getStableProjects();
        return await canistersManager.deleteCanister(dto, projects);
    };

    /* ----- Application Log Queries ----- */

    public shared query func getApplicationLogs(dto : ApplicationLogQueries.GetApplicationLogs) : async Result.Result<ApplicationLogQueries.ApplicationLogs, MopsEnums.Error> {
        return applicationLogsManager.getApplicationLogs(dto);
    };

    /* ----- Application Log Commands ----- */

    public shared ({ caller }) func addApplicationLog(dto : ApplicationLogCommands.AddApplicationLog) : async Result.Result<(), MopsEnums.Error> {
        assert isApprovedCanister(Principal.toText(caller));
        let _ = await applicationLogsManager.addApplicationLog(dto);
        return #ok();
    };

    /* ----- Support Query Queries ----- */

    public shared ({ caller }) func getSupportQueries(dto : SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.GetSupportQueries, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await supportQueriesManager.getSupportQueries(dto);
    };

    /* ----- Support Query Commands ----- */

    public shared ({ caller }) func createSupportQuery(dto : SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
        let _ = Principal.toText(caller);
        let _ = await supportQueriesManager.createSupportQuery(dto);
        return #ok();
    };

    /* ----- Private Motoko Actor Functions ----- */

    private func isApprovedCanister(callerPrincipalId : MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>(
            Environment.APPROVED_CANISTERS,
            func(canisterId : MopsIds.CanisterId) : Bool {
                canisterId == callerPrincipalId;
            },
        );

        return Option.isSome(approvedCaller);
    };

    private func isCallerAdmin(callerPrincipalId : MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>(
            [Environment.MASTER_PRINCIPAL_ID],
            func(principalId : MopsIds.CanisterId) : Bool {
                principalId == callerPrincipalId;
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
        stable_canisters_check_timer_id := Timer.recurringTimer<system>(#seconds(86_400), checkCanisters);
        ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
    };

    private func getManagerStableVariables() {
        stable_data_hashes := dataHashesManager.getStableDataHashes();
        stable_projects := projectsManager.getStableProjects();
        stable_team_members := teamMembersManager.getStableTeamMembers();
        stable_application_logs := applicationLogsManager.getStableApplicationLogs();
        stable_support_queries := supportQueriesManager.getStableSupportQueries();
    };

    private func setManagerStableVariables() {
        dataHashesManager.setStableDataHashes(stable_data_hashes);
        projectsManager.setStableProjects(stable_projects);
        teamMembersManager.setStableTeamMembers(stable_team_members);
        applicationLogsManager.setStableApplicationLogs(stable_application_logs);
        supportQueriesManager.setStableSupportQueries(stable_support_queries);
    };

    private func postUpgradeCallback() : async () {

    };

    private func checkCanisters() : async () {
        await canistersManager.checkCanisters();
    };

};
