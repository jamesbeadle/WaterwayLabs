module BaseTypes {

    public type PrincipalId = Text;
    public type CanisterId = Text;
    public type CalendarMonth = Nat8;
    public type CountryId = Nat16;
    public type ProposalId = Nat;
    public type RustResult = { #Ok : Text; #Err : Text };

    public type AppStatus = {
        onHold : Bool;
        version : Text;
    };

    public type Gender = {
        #Male;
        #Female;
    };

    public type DataHash = {
        category : Text;
        hash : Text;
    };

    public type Country = {
        id : CountryId;
        name : Text;
        code : Text;
    };

    public type CanisterTopup = {
        canisterId: CanisterId;
        topupTime: Int;
        cyclesAmount: Nat;
    };

    public type SystemLog = {
        eventId: Nat;
        eventTime: Int;
        eventType: LogEntryType;
        eventTitle: Text;
        eventDetail: Text;
    };

    public type LogEntryType = {
        #SystemCheck;
        #UnexpectedError;
        #CanisterTopup;
        #ManagerCanisterCreated;
    };

    public type Account = {
        owner : Principal;
        subaccount : Blob;
    };

    public type TimerInfo = {
        id : Int;
        triggerTime : Int;
        callbackName : Text;
    };
};