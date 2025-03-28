import AppTypes "../types/app_types";
import SupportTypes "../types/support_types";
import Base "mo:waterway-mops/BaseTypes";

module AppCommands {

    public type TopupCanister = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        cycles: Nat64;
    };

    public type SetComputeAllocation = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        computeAllocation: Nat;
    };

    public type SetMemoryAllocation = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        memoryAllocation: Nat;
    };

    public type SetFreezingThreshold = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        freezingThreshold: Nat;
    };

    public type AddController = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        controller: Base.PrincipalId;
    };

    public type RemoveController = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        controller: Base.PrincipalId;
    };

    public type TakeCanisterSnapshot = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
    };

    public type AssignSupportQueryToTeamMember = {

    };

    public type UpdateSupportQueryStatus = {
        
    };

    public type AddSupportQueryComment = {

    };

    public type RemoveSupportQueryComment = {

    };

    public type UpdateSupportQuery = {
        app: AppTypes.WaterwayLabsApp;
        status: SupportTypes.QueryStatus;

    };

    public type AddTeamMember = {
        firstName: Text;
        lastName: Text;
        principalId: Base.PrincipalId;
        jobTitle: Text;
        bio: [Text];
        image: Blob;
        video: ?Blob;
    };

    public type UpdateTeamMember = {
        id: AppTypes.TeamMemberId;
        firstName: Text;
        lastName: Text;
        principalId: Base.PrincipalId;
        jobTitle: Text;
        bio: [Text];
        image: Blob;
        video: ?Blob;
    };

    public type RemoveTeamMember = {
        id: AppTypes.TeamMemberId;
    };

    public type LogSystemEvent = {
        app: AppTypes.WaterwayLabsApp;

        eventId: Nat;
        eventTime: Int;
        eventType: Base.LogEntryType;
        eventTitle: Text;
        eventDetail: Text;
    };

    public type SubmitContactForm = {
        contact : Text;
        message : Text;
        name : Text;
    };
}