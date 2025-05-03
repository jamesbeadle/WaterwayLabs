import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Order "mo:base/Order";
import MopsTypes "mo:waterway-mops/BaseTypes";
import MopsEnums "mo:waterway-mops/Enums";
import LogsQueries "mo:waterway-mops/logs-management/LogsQueries";
import LogsCommands "mo:waterway-mops/logs-management/LogsCommands";
import BaseTypes "mo:waterway-mops/BaseTypes";
import Environment "../environment";

module {
    public class ApplicationLogsManager() {

        private var applicationLogs : [MopsTypes.ApplicationLog] = [];
        public func getStableApplicationLogs() : [MopsTypes.ApplicationLog] {
            applicationLogs;
        };
        public func setStableApplicationLogs(stable_application_logs : [MopsTypes.ApplicationLog]) {
            applicationLogs := stable_application_logs;
        };

        public func getApplicationLogs(dto : LogsQueries.GetApplicationLogs) : async Result.Result<LogsQueries.ApplicationLogs, MopsEnums.Error> {
            if (dto.page < 1) {
                return #err(#InvalidData);
            };

            let app = dto.app;
            var appLogs : [MopsTypes.ApplicationLog] = [];
            for (log in Iter.fromArray(applicationLogs)) {
                if (log.app == app) {
                    appLogs := Array.append(appLogs, [log]);
                };
            };

            appLogs := Array.sort<MopsTypes.ApplicationLog>(
                appLogs,
                func(a : MopsTypes.ApplicationLog, b : MopsTypes.ApplicationLog) : Order.Order {
                    if (a.createdOn < b.createdOn) {
                        return #greater;
                    } else if (a.createdOn > b.createdOn) {
                        return #less;
                    } else {
                        return #equal;
                    };
                },
            );

            let droppedEntries = List.drop<MopsTypes.ApplicationLog>(List.fromArray(appLogs), ((dto.page - 1) * Environment.ROWS_PER_PAGE));
            let paginatedEntries = List.take<MopsTypes.ApplicationLog>(droppedEntries, Environment.ROWS_PER_PAGE);

            let res : LogsQueries.ApplicationLogs = {
                app = app;
                logs = List.toArray(paginatedEntries);
                totalEntries = Array.size(appLogs);
            };
            return #ok(res);

        };

        public func addApplicationLog(dto : LogsCommands.AddApplicationLog) : async Result.Result<(), MopsEnums.Error> {
            let logEntry : BaseTypes.ApplicationLog = {
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
