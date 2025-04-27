import Result "mo:base/Result";
import AppTypes "../types/app_types";
import SupportQueryQueries "../queries/support_query_queries";
import SupportQueryCommands "../commands/support_query_commands";
import MopsEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";

module {
    public class SupportQueriesManager() {

        private var supportQueries : [AppTypes.SupportQuery] = [];
        public func getStableSupportQueries() : [AppTypes.SupportQuery] {
            supportQueries;
        };
        public func setStableSupportQueries(stable_support_queries : [AppTypes.SupportQuery]) {
            supportQueries := stable_support_queries;
        };

        public func getSupportQueries(dto : SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.GetSupportQueries, MopsEnums.Error> {
            return #ok({
                app = dto.app;
                //TODO add all details
            });
        };

        public func createSupportQuery(raisedBy: Ids.PrincipalId, dto : SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
            let valid = validate(dto);
            switch (valid) {
                case (#ok valid) {
                    //todo create


                    return #ok();
                };
                case (#err error) {
                    return #err(error);
                };
            };
        };

        private func validate(_ : SupportQueryCommands.CreateSupportQuery) : Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound)
            //TODO Validate
        };

    };
};
