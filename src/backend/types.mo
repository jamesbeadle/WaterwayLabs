import AppEnums "./enums";
import AppIds "mo:waterway-mops/product/wwl/ids";
import WaterwayEnums "mo:waterway-mops/product/wwl/enums";
import BaseEnums "mo:waterway-mops/base/enums";
import WaterwayIds "mo:waterway-mops/product/wwl/ids";
import Ids "mo:waterway-mops/base/ids";
module AppTypes {

    public type SupportQueryId = Nat;

    public type Project = {
        id : AppIds.ProjectId;
        name : Text;
        backendCanisterId : Ids.CanisterId;
        frontendCanisterId : Ids.CanisterId;
        websiteURL : Text;
        githubLink : Text;
        socialLinks : [(Text, Text)];
        status : AppEnums.ProjectStatus;
        description : Text;
        summary : Text;
        mainColour : Text;
        secondaryColour : Text;
        thirdColour : Text;
        app : WaterwayEnums.WaterwayLabsApp;
    };

    public type SupportQuery = {
        id : AppIds.SupportQueryId;
        name : Text;
        message : Text;
        contact : Text;
        status : AppEnums.QueryStatus;
        submittedBy : Ids.PrincipalId;
        submittedOn : Int;
        assignedTo : Ids.PrincipalId;
        app : Text;
        comments : [SupportQueryComment];
    };

    public type TeamMember = {
        id : AppIds.TeamMemberId;
        firstName : Text;
        lastName : Text;
        principalId : Ids.PrincipalId;
        jobTitle : Text;
        bio : [Text];
        image : Blob;
        video : ?Blob;
    };

    public type SupportQueryComment = {
        commentId : AppIds.SupportQueryCommentId;
        comment : Text;
        date : Int;
        author : Ids.PrincipalId;
        isAdmin : Bool;
    };

    public type CanisterCyclesTopup = {
        app : WaterwayEnums.WaterwayLabsApp;
        canisterId : Ids.CanisterId;
        amount : Nat;
        time : Int;
    };

    public type SystemLog = {
        eventId : Nat;
        eventTime : Int;
        eventType : WaterwayEnums.LogType;
        eventTitle : Text;
        eventDetail : Text;
    };

    public type ApplicationLog = {
        app : WaterwayEnums.WaterwayLabsApp;
        id : WaterwayIds.ApplicationLogId;
        createdOn : Int;
        logType : WaterwayEnums.LogType;
        title : Text;
        detail : Text;
        error : ?BaseEnums.Error;
    };
};
