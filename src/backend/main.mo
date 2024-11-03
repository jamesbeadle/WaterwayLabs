import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import T "types/app_types";
import Base "types/base_types";
import DTOs "dtos/app_dtos";
import Environment "environment";

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
     
    private var dataHashes : [Base.DataHash] = [
      { category = "projects"; hash = "DEFAULT" }
    ];

    private stable var projects: [T.Project] = [
        { 
            id = 1; 
            name = "Waterway Labs"; 
            backendCanisterId = "rbqtt-7yaaa-aaaal-qcndq-cai"; 
            frontendCanisterId="qm6x5-qqaaa-aaaal-qcnea-cai"; 
            websiteURL="waterwaylabs.xyz"; 
            githubLink="https://github.com/jamesbeadle/WaterwayLabs"; 
            socialLinks=[]; 
            status=#Development; 
            description="Web3 Technology Company.";
            summary="Waterway Labs is a Web3 Technology Company decentralising services using blockchain technology.";
            mainColour="#272727";
            secondaryColour="";
            thirdColour="";
        },
        { 
            id = 2; 
            name = "FootballGod"; 
            backendCanisterId = "44kin-waaaa-aaaal-qbxra-cai"; 
            frontendCanisterId="43loz-3yaaa-aaaal-qbxrq-cai"; 
            websiteURL="footballgod.xyz"; 
            githubLink="https://github.com/jamesbeadle/football_god"; 
            socialLinks=[];
            status=#Development;
            description="Web3 betting governed by a DAO.";
            summary="FootballGod will be a fixed odds betting platform funded by the OpenFPL DAO. Data managed to run OpenFPL and Transfer Kings will be used to offer odds on worldwide football matches. Algorithms for FootballGod will be managed by the OpenFPL DAO, allowing FootballGod to be used as a useful tool for controlling the FPL token supply. FootballGod has been designed to take advantage of the highly profitable nature of betting platforms to benefit OpenFPL token holders. FootballGod will send all profits to the OpenFPL DAO FPL Treasury, with the DAO able to burn these profit at it's discretion.";
            mainColour="#7F56F1";
            secondaryColour="";
            thirdColour=""; 
            },
        { 
            id = 3; 
            name = "OpenFPL"; 
            backendCanisterId = "y22zx-giaaa-aaaal-qmzpq-cai"; 
            frontendCanisterId="5gbds-naaaa-aaaal-qmzqa-cai"; 
            websiteURL="openfpl.xyz"; 
            githubLink="https://github.com/jamesbeadle/OpenFPL"; 
            socialLinks=[("X", "https://x.com/OpenFPL_DAO")];
             status=#Decentralised;
            description="Decentralised fantasy football.";
            summary="OpenFPL is a Decentralised fantasy football game for the Premier League hosted through the Internet Computer's Network Nervous System. OpenFPL token holders reach community consensus for player valuations, data validation, and more to ensure the entire platform operates entirely on the blockchain without third party dependencies.";
            mainColour="#2CE3A6";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 4; 
            name = "OpenWSL"; 
            backendCanisterId = "5bafg-ayaaa-aaaal-qmzqq-cai"; 
            frontendCanisterId="5ido2-wqaaa-aaaal-qmzra-cai"; 
            websiteURL="openwsl.xyz"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Development;
            description="Decentralised fantasy football.";
            summary="OpenWSL is a Decentralised fantasy football game for the Women's Super League, hosted through the Internet Computer's Network Nervous System. OpenWSL operates alongside OpenFPL with the aim of increasing WSL popularity along with introducing more women to  blockchain technology.";
            mainColour="#F156D2";
            secondaryColour="";
            thirdColour="";
        },
        { 
            id = 5; 
            name = "Transfer Kings"; 
            backendCanisterId = "fpmh5-ziaaa-aaaal-qjfbq-cai"; 
            frontendCanisterId="f2lwq-yaaaa-aaaal-qjfca-cai"; 
            websiteURL="transferkings.xyz"; 
            githubLink="https://github.com/jamesbeadle/transferkings"; 
            socialLinks=[]; 
            status=#Design;
            description="Become a football agent today.";
            summary="Transfer Kings is our upcoming purchase to play football agency game. Groups of friends will be able to setup their own agency, competing against each other for custom reward pools. Transfer Kings is designed to span multiple seasons and international tournaments, allowing your contracted players to achieve their expected career goals. Designed for the football expert that can spot prospects around the world, Transfer Kings is the worldwide football game Web3 has been waiting for.";
            mainColour="#2D64E3";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 6; 
            name = "GolfPad"; 
            backendCanisterId = "elbip-aiaaa-aaaal-qjfhq-cai"; 
            frontendCanisterId="gw4gh-taaaa-aaaal-qjfia-cai"; 
            websiteURL="golfpad.xyz"; 
            githubLink="https://github.com/jamesbeadle/GolfPad"; 
            socialLinks=[("X", "https://x.com/GolfPadDAO")]; 
            status=#Development;
            description="Golf meets Web3.";
            summary="GolfPad gives golfers of all levels a new dimension to their game. GolfPad focuses on individual achievements throughout your round rather than a single round's total score. This allows you to compete against your friends within a new framework, training your golf game for new scenarios.";
            mainColour="#F4C802";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 7; name = "OpenBook"; 
            backendCanisterId = "eur5j-5iaaa-aaaal-qcrva-cai"; 
            frontendCanisterId="etq35-qqaaa-aaaal-qcrvq-cai"; 
            websiteURL="openbook.services"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Development;
            description="Decentralised business management.";
            summary="OpenBook is evolving into a comprehensive, 100% on-chain business management platform. OpenBook's initial offering of sales, accountancy, recruitment, timesheet and task management are just the first step on delivering the perfect single SaaS for businesses at the lowest possible price.";
            mainColour="#66E094";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 8; name = "OpenBeats"; 
            backendCanisterId = ""; 
            frontendCanisterId=""; 
            websiteURL="openbeats.xyz"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Design;
            description="Decentralised Audio Production.";
            summary="OpenBeats is a decentralised audio production platform allowing artists to earn as producers collaborate. Create tracks using audio samples from the OpenBeats library, earning creators of samples a share the monthly subscription revenue.";
            mainColour="#FF8D7D";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 9; 
            name = "OpenChef"; 
            backendCanisterId = "h3scj-4iaaa-aaaal-qjfpq-cai"; 
            frontendCanisterId="chjym-xaaaa-aaaal-qjfqa-cai"; 
            websiteURL="openchef.xyz"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Design;
            description="Build your own cooking community.";
            summary="OpenChef is designed to enable chefs to earn as they help people within their local community. Chefs will create projects that receive funding through sponsorship, charitable donations and a share of premium content subscriptions. This funding will be used to feed the community, giving a chef the opportunity to show off their passion for cooking through charitable content. The DAO will vote on rewards for chefs that help the most people, ensuring as much good as possible can be done.";
            mainColour="#F55454";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 10; 
            name = "ICPFA"; 
            backendCanisterId = "qxz7x-niaaa-aaaal-qdidq-cai"; 
            frontendCanisterId="r2x3z-caaaa-aaaal-qdiea-cai"; 
            websiteURL="icpfa.org"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Development;
            description="Supporting community football.";
            summary="The ICPFA has been setup to support community grassroots football causes, funded by revenue from our football related applications.";
            mainColour="#FFFFFF";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 11; 
            name = "OpenCare"; 
            backendCanisterId = "cai6y-2yaaa-aaaal-qjfqq-cai"; 
            frontendCanisterId="coktq-biaaa-aaaal-qjfrq-cai"; 
            websiteURL="opencare.services"; 
            githubLink="";
             socialLinks=[]; 
             status=#Design;
            description="The Future Of Social Care.";
            summary="OpenCare has been designed with care professionals and families who have elderly relatives in care-homes. Caring for the elderly will be a huge challenge for society going forwards and OpenCare will provide a caring, efficient and secure solution to help all stakeholders involved.";
            mainColour="#FF69B4";
            secondaryColour="";
            thirdColour="";
        },
    ];

    public shared composite query func getDataHashes() : async Result.Result<[DTOs.DataHashDTO], T.Error> {
      return #ok(dataHashes);
    };
    
    public shared query func getProjects() : async Result.Result<[DTOs.ProjectDTO], T.Error>{
        return #ok(projects);
    };

    public shared query func getLogs() : async Result.Result<[Base.SystemLog], T.Error>{
        return #ok(logs);
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

    public shared ({ caller }) func logSystemEvent(dto: DTOs.SystemEventDTO) : async () {
        assert isCallerApproved(Principal.toText(caller));
        
        let logsBuffer = Buffer.fromArray<Base.SystemLog>(logs);
        logsBuffer.add({
            eventDetail = dto.eventDetail;
            eventId = dto.eventId;
            eventTime = dto.eventTime;
            eventTitle = dto.eventTitle;
            eventType = dto.eventType;
        });
        logs := Buffer.toArray(logsBuffer);
    };

    private func isCallerApproved(callerPrincipalId: Base.CanisterId) : Bool {
        return true; //REMOVE ALLOW ANY LOG
        let approvedCaller = Array.find<Base.CanisterId>(Environment.APPROVED_CANISTERS, func(canisterId: Base.CanisterId) : Bool {
            canisterId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };
}
