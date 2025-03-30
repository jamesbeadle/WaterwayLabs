import Enums "../enums/enums";
import MopsEnums "../cleanup/mops_enums";
import MopsIds "../cleanup/mops_ids";

module AppQueries {

    public type GetApplicationLogs = {
        app: Enums.WaterwayLabsApp;
        page: Nat;
    };

    public type ApplicationLogs = {
        app: Enums.WaterwayLabsApp;
        logs: [SystemEvent];
        page: Nat;
        totalEntries: Nat;
    };

    public type SystemEvent = {
        eventId: Nat;
        eventTime: Int;
        eventType: MopsEnums.LogEntryType;
        eventTitle: Text;
        eventDetail: Text;
    };

    public type GetCanisterSnapshots = {
        app: Enums.WaterwayLabsApp;
        canisterId: MopsIds.CanisterId;
        page: Nat;
    };

    public type Project = {
        id: MopsIds.ProjectId;
        name: Text;
        backendCanisterId: MopsIds.CanisterId;
        frontendCanisterId: MopsIds.CanisterId;
        websiteURL: Text;
        githubLink: Text;
        socialLinks: [(Text,Text)];
        status: Enums.ProjectStatus;
        description: Text;
        summary: Text;
        mainColour: Text;
        secondaryColour: Text;
        thirdColour: Text;
        onHold: Bool;
    };
}