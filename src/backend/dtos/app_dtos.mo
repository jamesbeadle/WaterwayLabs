import Base "../types/base_types";
import T "../types/app_types";

module AppDTOs {

    public type DataHashDTO = {
        category : Text;
        hash : Text;
    };

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


    public type ProjectDTO = {
        id: T.ProjectId;
        name: Text;
        backendCanisterId: Base.CanisterId;
        frontendCanisterId: Base.CanisterId;
        websiteURL: Text;
        githubLink: Text;
        socialLinks: [(Text,Text)];
        status: T.ProjectStatus;
        description: Text;
        summary: Text;
        mainColour: Text;
        secondaryColour: Text;
        thirdColour: Text;
    };

    public type TeamMemberDTO = {
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };

    public type CanisterDTO = {
        canisterId: Base.CanisterId;
        canisterName: Text;
        cycles: Nat;
        computeAllocation: Nat;
    };

    public type AppStatusDTO = {
        onHold : Bool;
        version : Text;
    };
}