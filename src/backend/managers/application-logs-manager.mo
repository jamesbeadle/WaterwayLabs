import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Order "mo:base/Order";
import Types "../types";
import Enums "mo:waterway-mops/base/enums";
import LogQueries "mo:waterway-mops/product/wwl/log-management/queries";
import LogCommands "mo:waterway-mops/product/wwl/log-management/commands";
import Environment "../environment";

module {
    public class ApplicationLogsManager() {

        private var applicationLogs : [Types.ApplicationLog] = [];
        public func getStableApplicationLogs() : [Types.ApplicationLog] {
            applicationLogs;
        };
        public func setStableApplicationLogs(stable_application_logs : [Types.ApplicationLog]) {
            applicationLogs := stable_application_logs;
        };

        public func getApplicationLogs(dto : LogQueries.GetApplicationLogs) : async Result.Result<LogQueries.ApplicationLogs, Enums.Error> {
            if (dto.page < 1) {
                return #err(#InvalidData);
            };

            let app = dto.app;
            var appLogs : [Types.ApplicationLog] = [];
            for (log in Iter.fromArray(applicationLogs)) {
                if (log.app == app) {
                    appLogs := Array.append(appLogs, [log]);
                };
            };

            appLogs := Array.sort<Types.ApplicationLog>(
                appLogs,
                func(a : Types.ApplicationLog, b : Types.ApplicationLog) : Order.Order {
                    if (a.createdOn < b.createdOn) {
                        return #greater;
                    } else if (a.createdOn > b.createdOn) {
                        return #less;
                    } else {
                        return #equal;
                    };
                },
            );

            let droppedEntries = List.drop<Types.ApplicationLog>(List.fromArray(appLogs), ((dto.page - 1) * Environment.ROWS_PER_PAGE));
            let paginatedEntries = List.take<Types.ApplicationLog>(droppedEntries, Environment.ROWS_PER_PAGE);

            let res : LogQueries.ApplicationLogs = {
                app = app;
                logs = List.toArray(paginatedEntries);
                totalEntries = Array.size(appLogs);
            };
            return #ok(res);

        };

        public func addApplicationLog(dto : LogCommands.AddApplicationLog) : async Result.Result<(), Enums.Error> {
            let logEntry : Types.ApplicationLog = {
                id = Array.size(applicationLogs) + 1;
                app = dto.app;
                createdOn = Time.now();
                logType = dto.logType;
                title = dto.title;
                detail = dto.detail;
                error = dto.error;
            };

            applicationLogs := Array.append(applicationLogs, [logEntry]);
            return #ok(());
        };

    };
};
