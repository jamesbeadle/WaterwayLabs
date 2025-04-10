import Enums "../enums/enums";
import MopsEnums "mo:waterway-mops/Enums";

module ApplicationLogCommands {
    public type AddApplicationLog = {
        app: Enums.WaterwayLabsApp;
        eventId: Nat;
        eventTime: Int;
        eventType: MopsEnums.LogEntryType;
        eventTitle: Text;
        eventDetail: Text;

    };
}