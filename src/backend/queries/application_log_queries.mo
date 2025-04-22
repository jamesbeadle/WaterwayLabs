import MopsIds "mo:waterway-mops/Ids";
import MopsEnums "mo:waterway-mops/Enums";

module ApplicationLogQueries {

    public type GetApplicationLogs = {
        app : MopsEnums.WaterwayLabsApp;
    };

    public type ApplicationLogs = {
        app : MopsEnums.WaterwayLabsApp;
        logs : [ApplicationLog];
        totalEntries : Nat;
    };

    public type ApplicationLog = {
        id : MopsIds.ApplicationLogId;
        eventId : Nat;
        eventTime : Int;
        eventType : MopsEnums.LogEntryType;
        eventTitle : Text;
        eventDetail : Text;
    };
};
