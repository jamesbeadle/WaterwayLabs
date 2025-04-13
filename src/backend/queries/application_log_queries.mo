import Enums "../enums/enums";
import MopsIds "mo:waterway-mops/Ids";
import MopsEnums "mo:waterway-mops/Enums";

module ApplicationLogQueries {

    public type GetApplicationLogs = {
        app: Enums.WaterwayLabsApp;
        page: Nat;
    };

    public type ApplicationLogs = {
        app: Enums.WaterwayLabsApp;
        logs: [ApplicationLog];
        page: Nat;
        totalEntries: Nat;
    };

    public type ApplicationLog = {
        id: MopsIds.ApplicationLogId;
        eventId: Nat;
        eventTime: Int;
        eventType: MopsEnums.LogEntryType;
        eventTitle: Text;
        eventDetail: Text;
    };
}