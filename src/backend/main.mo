//TODO - Remove and import correct mops package
import MopsQueries "cleanup/mops_queries";
import MopsEnums "cleanup/mops_enums";

//TODO - John we use these in each project so mops?
import Environment "environment";

//We can justify app specific utilities but global should be mops


/* ----- Mops Packages ----- */

import Array "mo:base/Array";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";


/* ----- Queries ----- */

import ProjectQueries "queries/project_queries";
import TeamMemberQueries "queries/team_member_queries";
import ApplicationLogQueries "queries/application_log_queries";
import CanisterQueries "queries/canister_queries";
import DataHashQueries "queries/data_hash_queries";


/* ----- Commands ----- */

import SupportQueryCommands "commands/support_query_commands";
import SupportQueryQueries "queries/support_query_queries";
import ApplicationLogCommands "commands/application_log_commands";
import ProjectCommands "commands/project_commands";
import TeamMemberCommands "commands/team_member_commands";


/* ----- Managers ----- */

import DataHashesManager "Managers/data_hashes_manager";
import TeamMembersManager "Managers/team_members_manager";
import ProjectsManager "Managers/projects_manager";
import SupportQueriesManager "Managers/support_queries_manager";
import CanistersManager "Managers/canisters_manager";
import ApplicationLogsManager "Managers/application_logs_manager";

 
/* ----- Only Stable Variables Should Use Types ----- */

import AppTypes "types/app_types";
import MopsTypes "cleanup/mops_types";
import MopsIds "cleanup/mops_ids";
import Management "cleanup/management";
import Utilities "utilities";

actor Self {


    /* ----- Stable Canister Variables ----- */ 

    private stable var stable_data_hashes : [MopsTypes.DataHash] = [];
    private stable var stable_projects: [AppTypes.Project] = [];
    private stable var stable_team_members: [AppTypes.TeamMember] = [];
    private stable var stable_application_logs: [MopsTypes.ApplicationLog] = [];
    private stable var stable_support_queries: [AppTypes.SupportQuery] = [];
    private stable var stable_app_status: MopsTypes.AppStatus = { 
        onHold = true; 
        version = ""; 
    };  
    

    /* ----- Domain Object Managers ----- */ 

    let dataHashesManager = DataHashesManager.DataHashesManager();
    let projectsManager = ProjectsManager.ProjectsManager();
    let teamMembersManager = TeamMembersManager.TeamMembersManager();
    let applicationLogsManager = ApplicationLogsManager.ApplicationLogsManager();
    let supportQueriesManager = SupportQueriesManager.SupportQueriesManager();
    let canistersManager = CanistersManager.CanistersManager();
    

    /* ----- General App Queries ----- */

    public shared query func getAppStatus() : async Result.Result<MopsQueries.AppStatus, MopsEnums.Error> {
        return #ok(stable_app_status);
    };


    /* ----- Data Hash Queries ----- */

    public shared query func getDataHashes(dto: DataHashQueries.GetDataHashes) : async Result.Result<DataHashQueries.DataHashes, MopsEnums.Error> {
      return dataHashesManager.getDataHashes(dto);
    };


    /* ----- Projects Queries ----- */
    
    public shared query func getProjects(dto: ProjectQueries.GetProjects) : async Result.Result<ProjectQueries.GetProjects, MopsEnums.Error>{
        return projectsManager.getProjects(dto);
    };


    /* ----- Projects Commands ----- */

    public shared func createProject(dto: ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.createProject(dto);
    };

    public shared func updateProject(dto: ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.updateProject(dto);
    };

    public shared func setProjectOnHold(dto: ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.setProjectOnHold(dto);
    };

    public shared func removeProjectOnHold(dto: ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.removeProjectOnHold(dto);
    };

    public shared func updateProjectVersion(dto: ProjectCommands.UpdateProjectVersion) : async Result.Result<(), MopsEnums.Error> {
        return await projectsManager.updateProjectVersion(dto);
    };


    /* ----- Team Member Queries ----- */

    public shared query func getTeamMembers() : async Result.Result<[TeamMemberQueries.TeamMember], MopsEnums.Error>{
        return #ok(stable_team_members);
    };


    /* ----- Team Member Commands ----- */

    public shared func addTeamMember(dto: TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.addTeamMember(dto);
    };

    public shared func removeTeamMember(dto: TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.removeTeamMember(dto);
    };


    /* ----- Canisters Queries ----- */
    
    public shared ({ caller }) func getProjectCanisters(dto: CanisterQueries.GetProjectCanisters) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        return await canistersManager.getProjectCanisters(dto);
    };


    /* ----- Canisters Commands ----- */

    public shared ({ caller }) func topupCanister(canisterId: MopsIds.CanisterId, cycles: Nat) : async Result.Result<(), MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        let canister_actor = actor (canisterId) : actor {};
             
        let IC : Management.Management = actor (Environment.Default);
        let _ = await Utilities.topup_canister_(canister_actor, IC, cycles);
        return #ok();
    };


    /* ----- Application Log Queries ----- */

    public shared query func getApplicationLogs(dto: ApplicationLogQueries.GetApplicationLogs) : async Result.Result<ApplicationLogQueries.ApplicationLogs, MopsEnums.Error>{
        return applicationLogsManager.getApplicationLogs(dto);
    };


    /* ----- Application Log Commands ----- */

    public shared ({ caller }) func addApplicationLog(dto: ApplicationLogCommands.AddApplicationLog) : async Result.Result<(), MopsEnums.Error> {
        assert isApprovedCanister(Principal.toText(caller));
        let _ = await applicationLogsManager.addApplicationLog(dto);
        return #ok();
    };

    
    /* ----- Support Query Queries ----- */

    public shared ({ caller }) func getSupportQueries(dto: SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.GetSupportQueries, MopsEnums.Error>{
        assert isCallerAdmin(Principal.toText(caller));
        return await supportQueriesManager.getSupportQueries(dto);
    };

    /* ----- Support Query Commands ----- */

    public shared ({ caller }) func createSupportQuery(dto: SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
        let submittedById = Principal.toText(caller);
        let _ = await supportQueriesManager.createSupportQuery(dto);
        return #ok();
    };


    /* ----- Private Motoko Actor Functions ----- */

    private func isApprovedCanister(callerPrincipalId: MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>(Environment.APPROVED_CANISTERS, func(canisterId: MopsIds.CanisterId) : Bool {
            canisterId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };

    private func isCallerAdmin(callerPrincipalId: MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>([Environment.MASTER_PRINCIPAL_ID], func(principalId: MopsIds.CanisterId) : Bool {
            principalId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };


    /* ----- Canister Lifecycle Management ----- */

    system func preupgrade() {
        getManagerStableVariables();
    };

    system func postupgrade() {
        setManagerStableVariables();
        ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback); 
    };

    private func getManagerStableVariables(){
        stable_data_hashes := dataHashesManager.getStableDataHashes();
        stable_projects := projectsManager.getStableProjects();
        stable_team_members := teamMembersManager.getStableTeamMembers();
        stable_application_logs := applicationLogsManager.getStableApplicationLogs();
        stable_support_queries := supportQueriesManager.getStableSupportQueries();
    };

    private func setManagerStableVariables(){
        dataHashesManager.setStableDataHashes(stable_data_hashes);
        projectsManager.setStableProjects(stable_projects);
        teamMembersManager.setStableTeamMembers(stable_team_members);
        applicationLogsManager.setStableApplicationLogs(stable_application_logs);
        supportQueriesManager.setStableSupportQueries(stable_support_queries);
    };

    private func postUpgradeCallback() : async (){
        
    };

}
