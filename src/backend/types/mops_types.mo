import MopsEnums "../enums/mops_enums";
import MopsIds "mops_ids";

module MopsTypes {

    public type ApplicationLog = {
        id: MopsIds.ApplicationLogId;
        createdOn: Int;
        logType: MopsEnums.LogEntryType;
        title: Text;
        detail: Text;
    };

    public type DataHash = {
        category : Text;
        hash : Text;
    };

    public type AppStatus = {
        onHold : Bool;
        version : Text;
    };
}