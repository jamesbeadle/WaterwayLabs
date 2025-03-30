import Result "mo:base/Result";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import AppTypes "../types/app_types";
import ProjectQueries "../queries/project_queries";
import ProjectCommands "../commands/project_commands";
import CanisterQueries "../queries/canister_queries";
import Management "../management";
import Utilities "../utilities";
import Environment "../environment";
import MopsEnums "../cleanup/mops_enums";

module {
    public class CanistersManager() {


        private var projects: [AppTypes.Project] = [];  
        public func getStableProjects() : [AppTypes.Project] { projects; };
        public func setStableProjects(stable_projects: [AppTypes.Project]) { projects := stable_projects; };


            public func getProjectCanisters(dto: CanisterQueries.GetProjectCanisters) : async Result.Result<CanisterQueries.ProjectCanisters, MopsEnums.Error> {
            
            let projectResult = Array.find<AppTypes.Project>(projects, func(foundProject: AppTypes.Project) : Bool {
                foundProject.app == dto.app;
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
                            /*
                            //TOOD
                            canisterBuffer.add({
                                app = project.app;
                                canisterId = project.backendCanisterId;
                                canisterName = "Backend";
                                cycles = backendCanisterStatus.cycles;
                                computeAllocation = backendCanisterStatus.compute_allocation;
                                controllers = backendCanisterStatus.contollers;
                                freezeThreshold = backendCanisterStatus.freezeThreshold;
                                memoryAllocation = backendCanisterStatus.memoryAllocation;
                                memoryUsage = backendCanisterStatus.memoryUsage;
                            })
                            */
                        };
                        case (null){}
                    };
                    
                    let frontendCanisterStatusResult = await Utilities.getCanisterStatus_(frontend_canister_actor, IC);
                    switch(frontendCanisterStatusResult){
                        case(?frontendCanisterStatus){
                            /* TODO
                            canisterBuffer.add({
                                canisterId = project.frontendCanisterId;
                                canisterName = "Frontend";
                                computeAllocation = frontendCanisterStatus.settings.compute_allocation;
                                cycles = frontendCanisterStatus.cycles;
                            })
                            */
                        };
                        case (null){}
                    };

                    return #ok({
                        entries = Buffer.toArray<CanisterQueries.CanisterInfo>(canisterBuffer);
                    });      
                };
                case (null){}
            };        
            return #err(#NotFound);
        };

        public func getProjects(dto: ProjectQueries.GetProjects) : Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
            return #ok({
                //TODO 
            });
        };

        public func createProject(dto: ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func setProjectOnHold(dto: ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func removeProjectOnHold(dto: ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func updateVersion(dto: ProjectCommands.UpdateProjectVersion) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        //update version
    
    };
};
