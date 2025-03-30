import MopsTypes "../types/mops_types";
import Result "mo:base/Result";
import MopsEnums "../enums/mops_enums";
import ApplicationLogQueries "../queries/application_log_queries";
import ApplicationLogCommands "../commands/application_log_commands";

module {
    public class ApplicationLogsManager() {

        private var applicationLogs: [MopsTypes.ApplicationLog] = [];
        public func getStableLogs() : [MopsTypes.ApplicationLog] { applicationLogs; };
        public func setStableLogs(stable_application_logs: [MopsTypes.ApplicationLog]) { applicationLogs := stable_application_logs; };

        public func getApplicationLogs(dto: ApplicationLogQueries.GetApplicationLogs) : Result.Result<ApplicationLogQueries.ApplicationLogs, MopsEnums.Error> {
            return #ok({
                app = dto.app;
                logs = []; //todo add logs
                page = dto.page;
                totalEntries = 0; //TODO get
            });
        };

        public func addApplicationLog(dto: ApplicationLogCommands.AddApplicationLog) : async Result.Result<(), MopsEnums.Error> {
            let valid = validate(dto);
            switch(valid){
                case (#ok valid){
                    //todo create
                    /*
                    let logsBuffer = Buffer.fromArray<BaseTypes.SystemLog>(logs);
                    logsBuffer.add({
                        eventDetail = dto.eventDetail;
                        eventId = dto.eventId;
                        eventTime = dto.eventTime;
                        eventTitle = dto.eventTitle;
                        eventType = dto.eventType;
                    });
                    logs := Buffer.toArray(logsBuffer);
                    */
                    return #ok();
                };
                case (#err error){
                    return #err(error);
                }
            };
        };

        private func validate(dto: ApplicationLogCommands.AddApplicationLog) : Result.Result<(), MopsEnums.Error> {
            return #err(#NotFound)
            //TODO Validate
        };
    };
};
