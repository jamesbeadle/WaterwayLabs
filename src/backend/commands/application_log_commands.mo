import MopsEnums "mo:waterway-mops/Enums";

module ApplicationLogCommands {
    public type AddApplicationLog = {
        app : MopsEnums.WaterwayLabsApp;
        eventId : Nat;
        eventTime : Int;
        eventType : MopsEnums.LogEntryType;
        eventTitle : Text;
        eventDetail : Text;

    };
};
