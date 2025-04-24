import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Time "mo:base/Time";
import MopsTypes "mo:waterway-mops/BaseTypes";
import MopsEnums "mo:waterway-mops/Enums";
import LogsQueries "mo:waterway-mops/logs-management/LogsQueries";
import LogsCommands "mo:waterway-mops/logs-management/LogsCommands";
import BaseTypes "mo:waterway-mops/BaseTypes";

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
            let app = dto.app;
            var appLogs : [MopsTypes.ApplicationLog] = [];
            for (log in Iter.fromArray(applicationLogs)) {
                if (log.app == app) {
                    appLogs := Array.append(appLogs, [log]);
                };

            };

            let res : LogsQueries.ApplicationLogs = {
                app = app;
                logs = appLogs;
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
