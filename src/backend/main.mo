import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Time "mo:base/Time";

//TODO Better folder organisation required
import Environment "environment";
import Management "management";
import SHA224 "./lib/SHA224";
import Utilities "utilities";

import AppQueries "queries/app_queries";
import CanisterQueries "queries/canister_queries";

//Remove and import correct mops package
import MopsQueries "queries/mops_queries";
import MopsEnums "enums/mops_enums";
import MopsTypes "types/mops_types";
import MopsIds "types/mops_ids";

//Only Stable Variables Should Use Application Types
//Refactor infto managers to remove 
import AppTypes "types/app_types";
import TeamMemberQueries "queries/team_member_queries";
import ApplicationLogQueries "queries/application_log_queries";
import SupportQueryCommands "commands/support_query_commands";
import SupportQueryQueries "queries/support_query_queries";
import ApplicationLogCommands "commands/application_log_commands";
import ApplicationLogsManager "Managers/application_logs_manager";
import DataHashesManager "Managers/data_hashes_manager";
import TeamMembersManager "Managers/team_members_manager";
import ProjectsManager "Managers/projects_manager";
import SupportQueriesManager "Managers/support_queries_manager";
import ProjectQueries "queries/project_queries";
import ProjectCommands "commands/project_commands";
import TeamMemberCommands "commands/team_member_commands";

actor Self {


    /* ----- Stable Canister Variables ----- */ 

    private stable var dataHashes : [MopsTypes.DataHash] = [];
    private stable var projects: [AppTypes.Project] = [];
    private stable var teamMembers: [AppTypes.TeamMember] = [];
    private stable var logs: [MopsTypes.ApplicationLog] = [];
    private stable var supportQueries: [AppTypes.SupportQuery] = [];
    private stable var appStatus: MopsTypes.AppStatus = { 
        onHold = true; 
        version = ""; 
    };  
    

    /* ----- Domain Object Managers ----- */ 

    let dataHashesManager = DataHashesManager.DataHashesManager();
    let projectsManager = ProjectsManager.ProjectsManager();
    let teamMembersManager = TeamMembersManager.TeamMembersManager();
    let applicationLogsManager = ApplicationLogsManager.ApplicationLogsManager();
    let supportQueriesManager = SupportQueriesManager.SupportQueriesManager();
    

    /* ----- General App Queries ----- */

    public shared query func getAppStatus() : async Result.Result<MopsQueries.AppStatus, MopsEnums.Error> {
        return #ok(appStatus);
    };


    /* ----- Data Hash Queries ----- */

    public shared composite query func getDataHashes() : async Result.Result<[MopsTypes.DataHash], MopsEnums.Error> {
      return #ok(dataHashes);
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
        return #ok(teamMembers);
    };


    /* ----- Team Member Commands ----- */

    public shared func addTeamMember(dto: TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.addTeamMember(dto);
    };

    public shared func removeTeamMember(dto: TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.removeTeamMember(dto);
    };


    /* ----- Canisters Queries ----- */
    
    public shared ({ caller }) func getProjectCanisterInfo(projectId: MopsIds.ProjectId) : async Result.Result<[CanisterQueries.CanisterInfo], MopsEnums.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        
        let projectResult = Array.find<T.Project>(projects, func(foundProject: T.Project) : Bool {
            foundProject.id == projectId;
        });

        switch(projectResult){
            case (?project){
                let canisterBuffer = Buffer.fromArray<CanisterQueries.CanisterInfo>([]);
                
                let IC : Management.Management = actor (Environment.Default);
                let backend_canister_actor = actor (project.backendCanisterId) : actor {};
                let frontend_canister_actor = actor (project.frontendCanisterId) : actor {};

                let backendCanisterStatusResult = await Utilities.getCanisterStatus_(backend_canister_actor, IC);
                switch(backendCanisterStatusResult){
                    case(?backendCanisterStatus){
                        canisterBuffer.add({
                            canisterId = project.backendCanisterId;
                            canisterName = "Backend";
                            computeAllocation = backendCanisterStatus.settings.compute_allocation;
                            cycles = backendCanisterStatus.cycles;
                        })
                    };
                    case (null){}
                };
                
                let frontendCanisterStatusResult = await Utilities.getCanisterStatus_(frontend_canister_actor, IC);
                switch(frontendCanisterStatusResult){
                    case(?frontendCanisterStatus){
                        canisterBuffer.add({
                            canisterId = project.frontendCanisterId;
                            canisterName = "Frontend";
                            computeAllocation = frontendCanisterStatus.settings.compute_allocation;
                            cycles = frontendCanisterStatus.cycles;
                        })
                    };
                    case (null){}
                };

                return #ok(Buffer.toArray(canisterBuffer));      
            };
            case (null){}
        };        
        return #err(#NotFound);
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
    public shared ({ caller }) func addApplicationLog(dto: ApplicationLogCommands.AddApplicationLog) : async () {
        assert isCallerApproved(Principal.toText(caller));
        
        let logsBuffer = Buffer.fromArray<BaseTypes.SystemLog>(logs);
        logsBuffer.add({
            eventDetail = dto.eventDetail;
            eventId = dto.eventId;
            eventTime = dto.eventTime;
            eventTitle = dto.eventTitle;
            eventType = dto.eventType;
        });
        logs := Buffer.toArray(logsBuffer);
    };

    
    /* ----- Support Query Queries ----- */

    public shared ({ caller }) func getSupportQueries(dto: SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.GetSupportQueries, MopsEnums.Error>{
        assert isManager(Principal.toText(caller));
        return #ok(supportQueries);
    };

    /* ----- Support Query Commands ----- */

    public shared ({ caller }) func createSupportQuery(dto: SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
        let submittedById = Principal.toText(caller);

        let newSubmission: T.FormSubmission = {
            contact = dto.contact;
            message = dto.message;
            name = dto.name;
            status = #Unread;
            submittedBy = submittedById;
            submittedOn = Time.now();
        };

        let formSubmissionsBuffer = Buffer.fromArray<T.FormSubmission>(formSubmissions);
        formSubmissionsBuffer.add(newSubmission);
        formSubmissions := Buffer.toArray(formSubmissionsBuffer);

        return #ok();
    };


    /* ----- Private Motoko Actor Functions ----- */

    private func isApprovedCanister(callerPrincipalId: MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<BaseTypes.CanisterId>(Environment.APPROVED_CANISTERS, func(canisterId: BaseTypes.CanisterId) : Bool {
            canisterId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };

    private func isCallerAdmin(callerPrincipalId: MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>([Environment.MASTER_PRINCIPAL_ID], func(principalId: BaseTypes.CanisterId) : Bool {
            principalId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };


    /* ----- Canister Lifecycle Management ----- */

    system func preupgrade() {
        dataHashes := dataHashesManager.getStableDataHashes();
        projects := [];
        teamMembers := [];
        logs := [];
        supportQueries := [];
    };

    system func postupgrade() {
      
      ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback); 
    };

    private func postUpgradeCallback() : async (){
        
    };

}
