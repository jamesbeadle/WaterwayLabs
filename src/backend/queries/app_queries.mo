import Enums "mo:waterway-mops/Enums";
import MopsIds "mo:waterway-mops/Ids";

module AppQueries {

    public type GetApplicationLogs = {
        app : Enums.WaterwayLabsApp;
        page : Nat;
    };

    public type ApplicationLogs = {
        app : Enums.WaterwayLabsApp;
        logs : [SystemEvent];
        page : Nat;
        totalEntries : Nat;
    };

    public type SystemEvent = {
        eventId : Nat;
        eventTime : Int;
        eventType : Enums.LogEntryType;
        eventTitle : Text;
        eventDetail : Text;
    };

    public type GetCanisterSnapshots = {
        app : Enums.WaterwayLabsApp;
        canisterId : MopsIds.CanisterId;
        page : Nat;
    };

};
