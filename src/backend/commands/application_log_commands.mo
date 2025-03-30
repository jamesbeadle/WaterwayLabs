import Enums "../enums/enums";
import MopsEnums "../cleanup/mops_enums";

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