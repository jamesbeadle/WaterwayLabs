//TODO Move to mops

module MopsQueries {
    public type DataHash = {
        category : Text;
        hash : Text;
    };

    public type AppStatus = {
        onHold : Bool;
        version : Text;
    };
};
    