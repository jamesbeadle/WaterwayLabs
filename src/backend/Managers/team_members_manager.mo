import Result "mo:base/Result";
import AppTypes "../types/app_types";
import TeamMemberQueries "../queries/team_member_queries";
import TeamMemberCommands "../commands/team_member_commands";
import MopsEnums "../cleanup/mops_enums";

module {
    public class TeamMembersManager() {


        private var teamMembers: [AppTypes.TeamMember] = [];  
        public func getStableTeamMembers() : [AppTypes.TeamMember] { teamMembers; };
        public func setStableTeamMembers(stable_team_members: [AppTypes.TeamMember]) { teamMembers := stable_team_members; };

        public func getTeamMembers(dto: TeamMemberQueries.GetTeamMembers) : async Result.Result<TeamMemberQueries.TeamMembers, MopsEnums.Error> {
            return #ok({
                page = dto.page; 
                teamMember = []; //TODO 
                totalEntries = 0; //TODO
            }); 
        };

        public func addTeamMember(dto: TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func removeTeamMember(dto: TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };
    };
};
