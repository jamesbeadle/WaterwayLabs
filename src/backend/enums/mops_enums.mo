module MopsEnums {
    public type LogEntryType = {
        #Warning;
        #Error;
        #Information;
        #Success;
        #SystemCheck;
        #CanisterTopup;
        #CanisterCreated;
    };

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
}