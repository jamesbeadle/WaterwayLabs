import Result "mo:base/Result";
import AppTypes "../types/app_types";
import SupportQueryQueries "../queries/support_query_queries";
import SupportQueryCommands "../commands/support_query_commands";
import MopsEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";

module {
    public class SupportQueriesManager() {

        private var supportQueries : [AppTypes.SupportQuery] = [];
        private var archivedSupportQueries : [AppTypes.SupportQuery] = [];

        public func getStableSupportQueries() : [AppTypes.SupportQuery] {
            supportQueries;
        };
        public func setStableSupportQueries(stable_support_queries : [AppTypes.SupportQuery]) {
            supportQueries := stable_support_queries;
        };

        public func getStableArchivedSupportQueries() : [AppTypes.SupportQuery] {
            archivedSupportQueries;
        };
        public func setStableArchivedSupportQueries(stable_archived_support_queries : [AppTypes.SupportQuery]) {
            archivedSupportQueries := stable_archived_support_queries;
        };

        public func getSupportQueries(_ : SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            return #ok({
                totalEntries = 0;
                page = 0;
                app = ?#OpenFPL;
                supportQueries = []
                //TODO add all details
            });
        };

        public func getArchivedSupportQueries(dto: SupportQueryQueries.GetUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func getUserSupportQueries(dto: SupportQueryQueries.GetUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func getArchivedUserSupportQueries(dto: SupportQueryQueries.GetArchivedUserSupportQueries) : async Result.Result<SupportQueryQueries.SupportQueries, MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func createSupportQuery(dto : SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
            let validateResult = validate(dto);
            let #ok(_) = validateResult else {
                return validateResult;
            };
            //todo create

        };

        public func archiveSupportQuery(dto : SupportQueryCommands.ArchiveSupportQuery) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func addSupportQueryComment(dto : SupportQueryCommands.AddSupportQueryComment) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        public func removeSupportQueryComment(dto : SupportQueryCommands.RemoveSupportQueryComment) : async Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound);
        };

        private func validate(_ : SupportQueryCommands.CreateSupportQuery) : Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound)
            //TODO Validate
        };

    };
};
