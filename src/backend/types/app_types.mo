
import Enums "../enums/app_enums";
import MopsIds "mo:waterway-mops/Ids";
import WaterWayEnums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
module AppTypes {

    public type SupportQueryId = Nat32;

    public type Project = {
        id : MopsIds.ProjectId;
        name : Text;
        backendCanisterId : MopsIds.CanisterId;
        frontendCanisterId : MopsIds.CanisterId;
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
        id : MopsIds.SupportQueryId;
        name : Text;
        message : Text;
        contact : Text;
        status : Enums.QueryStatus;
        submittedBy : MopsIds.PrincipalId;
        submittedOn : Int;
        assignedTo : Ids.PrincipalId;
    };

    public type TeamMember = {
        id : Ids.PrincipalId;
        name : Text;
        title : Text;
        image : Text;
        bio : Text;
    };

    public type SupportQueryComment = {
        comment : Text;
    };

    public type CanisterCyclesTopup = {
        app : WaterWayEnums.WaterwayLabsApp;
        canisterId : MopsIds.CanisterId;
        amount : Nat;
        time : Int;
    };
};
