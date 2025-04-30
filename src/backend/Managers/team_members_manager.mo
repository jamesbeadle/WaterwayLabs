import Result "mo:base/Result";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Nat16 "mo:base/Nat16";
import Option "mo:base/Option";
import AppTypes "../types/app_types";
import TeamMemberQueries "../queries/team_member_queries";
import TeamMemberCommands "../commands/team_member_commands";
import MopsEnums "mo:waterway-mops/Enums";

module {
    public class TeamMembersManager() {

        private var teamMembers : [AppTypes.TeamMember] = [];
        private var activeTeamMemberId : Nat16 = 1;
        public func getStableTeamMembers() : [AppTypes.TeamMember] {
            teamMembers;
        };
        public func setStableTeamMembers(stable_team_members : [AppTypes.TeamMember]) {
            teamMembers := stable_team_members;
        };

        public func getStableActiveTeamMemberId() : Nat16 {
            activeTeamMemberId;
        };
        public func setStableActiveTeamMemberId(stable_active_team_member_id : Nat16) {
            activeTeamMemberId := stable_active_team_member_id;
        };

        public func getTeamMembers(dto : TeamMemberQueries.GetTeamMembers) : async Result.Result<TeamMemberQueries.TeamMembers, MopsEnums.Error> {
            let page = dto.page;
            let totalEntries = teamMembers.size();
            let startIndex = page * 10;
            let endIndex = Nat.min(startIndex + 10, totalEntries);

            var res : [TeamMemberQueries.TeamMember] = Array.map(
                teamMembers,
                func(teamMember : AppTypes.TeamMember) : TeamMemberQueries.TeamMember {
                    {
                        firstName = teamMember.firstName;
                        lastName = teamMember.lastName;
                        image = teamMember.image;
                        bio = teamMember.bio;
                        video = teamMember.video;
                        jobTitle = teamMember.jobTitle;
                    };
                },
            );
            let teamMemberSlice = Array.slice(res, startIndex, endIndex);
            return #ok({
                teamMember = Iter.toArray(teamMemberSlice);
                page = page;
                totalEntries = totalEntries;
            });
        };

        public func addTeamMember(dto : TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
            let newTeamMember = {
                id = activeTeamMemberId;
                firstName = dto.firstName;
                lastName = dto.lastName;
                principalId = dto.principalId;
                jobTitle = dto.jobTitle;
                bio = dto.bio;
                image = dto.image;
                video = dto.video;
            };
            teamMembers := Array.append(teamMembers, [newTeamMember]);
            activeTeamMemberId := activeTeamMemberId + 1;
            return #ok(());
        };

        public func removeTeamMember(dto : TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
            let ?_ = Array.find(
                teamMembers,
                func(teamMember : AppTypes.TeamMember) : Bool {
                    Nat16.equal(teamMember.id, dto.id);
                },
            ) else {
                return #err(#NotFound);
            };

            teamMembers := Array.filter(
                teamMembers,
                func(teamMember : AppTypes.TeamMember) : Bool {
                    not Nat16.equal(teamMember.id, dto.id);
                },
            );
            return #ok(());
        };

        public func updateTeamMember(dto : TeamMemberCommands.UpdateTeamMember) : async Result.Result<(), MopsEnums.Error> {
            let ?teamMember = Array.find(
                teamMembers,
                func(teamMember : AppTypes.TeamMember) : Bool {
                    Nat16.equal(teamMember.id, dto.id);
                },
            ) else {
                return #err(#NotFound);
            };

            let updatedVideo = switch (dto.video) {
                case (?video) { ?video };
                case (_) { teamMember.video };
            };

            let updatedTeamMember = {
                id = teamMember.id;
                firstName = Option.get(dto.firstName, teamMember.firstName);
                lastName = Option.get(dto.lastName, teamMember.lastName);
                principalId = Option.get(dto.principalId, teamMember.principalId);
                jobTitle = Option.get(dto.jobTitle, teamMember.jobTitle);
                bio = Option.get(dto.bio, teamMember.bio);
                image = Option.get(dto.image, teamMember.image);
                video = updatedVideo;
            };
            teamMembers := Array.map(
                teamMembers,
                func(teamMember : AppTypes.TeamMember) : AppTypes.TeamMember {
                    if (Nat16.equal(teamMember.id, dto.id)) {
                        updatedTeamMember;
                    } else {
                        teamMember;
                    };
                },
            );
            return #ok(());
        };
    };
};
