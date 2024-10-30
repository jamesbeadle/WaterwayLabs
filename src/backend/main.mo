import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import T "types/app_types";
import Base "types/base_types";
import DTOs "dtos/app_dtos";

actor {

    var logs: [Base.SystemLog] = [];
    var formSubmissions: [T.FormSubmission] = [];

    let admins = [
        "" //James Beadle
    ];

    let managers = [
        "", //Zoe Duffy
        "", //Kelly Howlett
        "", //George Brennan
        "", //Josh Wray
        "", //Thilly T
    ];


    private stable var projects: [T.Project] = [
        { name = "Waterway Labs"; backendCanisterId = "rbqtt-7yaaa-aaaal-qcndq-cai"; frontendCanisterId="qm6x5-qqaaa-aaaal-qcnea-cai"; websiteURL="waterwaylabs.xyz"; githubLink="https://github.com/jamesbeadle/WaterwayLabs"; socialLinks=[]; status=#Development; },
        { name = "FootballGod"; backendCanisterId = "44kin-waaaa-aaaal-qbxra-cai"; frontendCanisterId="43loz-3yaaa-aaaal-qbxrq-cai"; websiteURL="footballgod.xyz"; githubLink=""; socialLinks=[]; status=#Development; },
        { name = "OpenFPL"; backendCanisterId = "y22zx-giaaa-aaaal-qmzpq-cai"; frontendCanisterId="5gbds-naaaa-aaaal-qmzqa-cai"; websiteURL="openfpl.xyz"; githubLink=""; socialLinks=[]; status=#Decentralised;},
        { name = "OpenWSL"; backendCanisterId = "5bafg-ayaaa-aaaal-qmzqq-cai"; frontendCanisterId="5ido2-wqaaa-aaaal-qmzra-cai"; websiteURL="openwsl.xyz"; githubLink=""; socialLinks=[]; status=#Development;},
        { name = "Transfer Kings"; backendCanisterId = "fpmh5-ziaaa-aaaal-qjfbq-cai"; frontendCanisterId="f2lwq-yaaaa-aaaal-qjfca-cai"; websiteURL="transferkings.xyz"; githubLink=""; socialLinks=[]; status=#Design;},
        { name = "GolfPad"; backendCanisterId = "elbip-aiaaa-aaaal-qjfhq-cai"; frontendCanisterId="gw4gh-taaaa-aaaal-qjfia-cai"; websiteURL="golfpad.xyz"; githubLink=""; socialLinks=[]; status=#Development;},
        { name = "OpenBook"; backendCanisterId = "eur5j-5iaaa-aaaal-qcrva-cai"; frontendCanisterId="etq35-qqaaa-aaaal-qcrvq-cai"; websiteURL="openbook.services"; githubLink=""; socialLinks=[]; status=#Development;},
        { name = "OpenBeats"; backendCanisterId = ""; frontendCanisterId=""; websiteURL="openbeats.xyz"; githubLink=""; socialLinks=[]; status=#Design;},
        { name = "OpenChef"; backendCanisterId = "h3scj-4iaaa-aaaal-qjfpq-cai"; frontendCanisterId="chjym-xaaaa-aaaal-qjfqa-cai"; websiteURL="openchef.xyz"; githubLink=""; socialLinks=[]; status=#Design;},
        { name = "ICPFA"; backendCanisterId = "qxz7x-niaaa-aaaal-qdidq-cai"; frontendCanisterId="r2x3z-caaaa-aaaal-qdiea-cai"; websiteURL="icpfa.org"; githubLink=""; socialLinks=[]; status=#Development;},
        { name = "OpenCare"; backendCanisterId = "cai6y-2yaaa-aaaal-qjfqq-cai"; frontendCanisterId="coktq-biaaa-aaaal-qjfrq-cai"; websiteURL="opencare.services"; githubLink=""; socialLinks=[]; status=#Design;},
    ];

    public shared query func getProjects() : async Result.Result<[T.Project], T.Error>{
        return #ok(projects);
    };

    public shared ({ caller }) func submitForm(dto: DTOs.SubmitContactFormDTO) : async Result.Result<(), T.Error> {
        assert not Principal.isAnonymous(caller);
        
        let submittedById = Principal.toText(caller);

        let existingOutstandingForm = Array.find<T.FormSubmission>(formSubmissions, func(submission: T.FormSubmission) : Bool {
            submission.submittedBy == submittedById;
        });
        assert Option.isNull(existingOutstandingForm);

        let newSubmission: T.FormSubmission = {
            contact = dto.contact;
            message = dto.message;
            name = dto.name;
            status = #Unread;
            submittedBy = submittedById;

        };

        let formSubmissionsBuffer = Buffer.fromArray<T.FormSubmission>(formSubmissions);
        formSubmissionsBuffer.add(newSubmission);
        formSubmissions := Buffer.toArray(formSubmissionsBuffer);

        return #ok();
    };

    /*public shared ({ caller }) func logSystemEvent(dto: DTOs.SystemEventDTO) : async Result.Result<(), T.Error> {

    };*/

    //Record a system log if from approved canister of app
}
