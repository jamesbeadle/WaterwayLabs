import Base "../types/base_types";
module AppDTOs {
    public type SubmitContactFormDTO = {
        contact : Text;
        message : Text;
        name : Text;
    };

    public type SystemEventDTO = {
        eventId: Nat;
        eventTime: Int;
        eventType: Base.LogEntryType;
        eventTitle: Text;
        eventDetail: Text;
    };
}