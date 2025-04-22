import MopsEnums "mo:waterway-mops/Enums";
import MopsIds "mo:waterway-mops/Ids";

module AppQueries {

    public type GetApplicationLogs = {
        app : MopsEnums.WaterwayLabsApp;
    };

    public type ApplicationLogs = {
        app : MopsEnums.WaterwayLabsApp;
        logs : [SystemEvent];
        totalEntries : Nat;
    };

    public type SystemEvent = {
        eventId : Nat;
        eventTime : Int;
        eventType : MopsEnums.LogEntryType;
        eventTitle : Text;
        eventDetail : Text;
    };

    public type GetCanisterSnapshots = {
        app : MopsEnums.WaterwayLabsApp;
        canisterId : MopsIds.CanisterId;
    };

};
