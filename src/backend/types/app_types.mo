import Enums "../enums/app_enums";
import WWLIds "mo:waterway-mops/WWLIds";
import WaterWayEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
module AppTypes {

    public type SupportQueryId = Nat;

    public type Project = {
        id : WWLIds.ProjectId;
        name : Text;
        backendCanisterId : Ids.CanisterId;
        frontendCanisterId : Ids.CanisterId;
        websiteURL : Text;
        githubLink : Text;
        socialLinks : [(Text, Text)];
        status : Enums.ProjectStatus;
        description : Text;
        summary : Text;
        mainColour : Text;
        secondaryColour : Text;
        thirdColour : Text;
        app : WaterWayEnums.WaterwayLabsApp;
    };

    public type SupportQuery = {
        id : WWLIds.SupportQueryId;
        name : Text;
        message : Text;
        contact : Text;
        status : Enums.QueryStatus;
        submittedBy : Ids.PrincipalId;
        submittedOn : Int;
        assignedTo : Ids.PrincipalId;
        app : Text;
        comments : [SupportQueryComment];
    };

    public type TeamMember = {
        id : WWLIds.TeamMemberId;
        firstName : Text;
        lastName : Text;
        principalId : Ids.PrincipalId;
        jobTitle : Text;
        bio : [Text];
        image : Blob;
        video : ?Blob;
    };

    public type SupportQueryComment = {
        commentId : WWLIds.SupportQueryCommentId;
        comment : Text;
        date : Int;
        author : Ids.PrincipalId;
        isAdmin : Bool;
    };

    public type CanisterCyclesTopup = {
        app : WaterWayEnums.WaterwayLabsApp;
        canisterId : Ids.CanisterId;
        amount : Nat;
        time : Int;
    };
};
