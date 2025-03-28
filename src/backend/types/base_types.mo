import Base "mo:waterway-mops/BaseTypes";
module BaseTypes {

    //TODO Move to mops

    public type Error = {
        #AlreadyExists;
        #AlreadyUsed;
        #CallFailed;
        #CanisterFull;
        #DecodeError;
        #DuplicateAction;
        #InvalidData;
        #NotFound;
        #NotAuthorized;
        #NotAllowed;
        #NotEnoughFunds;
        #OutOfRange;
        #PaymentError;
        #TooShort;
        #TooLong;
        #CreateError;
        #UpdateError;
        #DeleteError;
    };

    public type SystemEvent = {
        eventId: Nat;
        eventTime: Int;
        eventType: Base.LogEntryType;
        eventTitle: Text;
        eventDetail: Text;
    };
}