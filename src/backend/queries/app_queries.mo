import AppTypes "../types/app_types";
import BaseTypes "../types/base_types"; //TODO mops
import Base "mo:waterway-mops/BaseTypes";

module AppQueries {

    public type GetCanisterInfo = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
    };

    public type CanisterInfo = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        cycles: Nat;
        computeAllocation: Nat;
        freezeThreshold: Nat;
        memoryAllocation: Nat;
        controllers: [Base.PrincipalId];
        memoryUsage: Nat;
        //TODO: Others

    };

    public type GetSupportQueries = {

        app: ?AppTypes.WaterwayLabsApp;
    };

    public type SupportQueries = {

    };

    public type GetProjects = {

    };

    public type Projects = {

    };

    public type GetApplicationLogs = {
        app: AppTypes.WaterwayLabsApp;
        page: Nat;
    };

    public type ApplicationLogs = {
        app: AppTypes.WaterwayLabsApp;
        logs: [BaseTypes.SystemEvent];
        page: Nat;
        totalEntries: Nat;
    };

    public type GetCanisterSnapshots = {
        app: AppTypes.WaterwayLabsApp;
        canisterId: Base.CanisterId;
        page: Nat;
    };

 public type Project = {
        id: AppTypes.ProjectId;
        name: Text;
        backendCanisterId: Base.CanisterId;
        frontendCanisterId: Base.CanisterId;
        websiteURL: Text;
        githubLink: Text;
        socialLinks: [(Text,Text)];
        status: AppTypes.ProjectStatus;
        description: Text;
        summary: Text;
        mainColour: Text;
        secondaryColour: Text;
        thirdColour: Text;
    };

    public type TeamMember = {
        name: Text;
        title: Text;
        image: Text;
        bio: Text;
    };

    public type Canister = {
        canisterId: Base.CanisterId;
        canisterName: Text;
        cycles: Nat;
        computeAllocation: Nat;
    };
}