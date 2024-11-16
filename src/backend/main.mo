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
import Cycles "mo:base/ExperimentalCycles";
import Timer "mo:base/Timer";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Utilities "utilities";
import Management "management";
import SHA224 "./lib/SHA224";

actor Self {

    private stable var logs: [Base.SystemLog] = [];
    private stable var formSubmissions: [T.FormSubmission] = [];
     
    private stable var dataHashes : [Base.DataHash] = [
      { category = "projects"; hash = "DEFAULT" },
      { category = "team_members"; hash = "DEFAULT" }
    ];

    private var teamMembers: [T.TeamMember] = [
        { 
            name = "Zoe Duffy";
            title = "Managing Director"; 
            image = "zoe.jpg"; 
            bio = "Zoe runs many tech companies through her management consultancy, providing expert advice to ensure compliance with various legal frameworks.";
        },
        { 
            name = "Kelly Howlett";
            title = "Head of Operations"; 
            image = "kelly.jpeg"; 
            bio = "Kelly ensures the day-to-day operation of Waterway Labs on all things water. Kelly has the experience required to ensure anything can be done in a safe and secure manner."; 
        },
        { 
            name = "James Beadle"; 
            title = "Development Manager"; 
            image = "james.jpg"; 
            bio = "James ensures the delivery of all Waterway Labs Projects."; 
        },
        { 
            name = "Dfinity Designer"; 
            title = "Head of Design"; 
            image = "dfd.jpg"; 
            bio = "DfinityDesigner is a talented UI/UX designer that has put his stamp on various blockchain projects. He is known for high-quality, brilliant branding.";
        },
        { 
            name = "Thilly Thana"; 
            title = "Lead Developer"; 
            image = "thilly.jpg"; 
            bio = "Thilly is a computer science graduate with a passion for frontend development. Thilly brings DfinityDesigner’s designs to life using his expert Svelte skills.";
        },
        { 
            name = "George Robinson"; 
            title = "Community Manager"; 
            image = "george.jpg"; 
            bio = "George builds relationships with community members through any channel with users receptive to the Internet Computer’s message.";
        },
        { 
            name = "Josh Wray"; 
            title = "Head of Promotion"; 
            image = "josh.jpg"; 
            bio = "Josh ensures our team has the relationships in place to foster a co-operative, results-driven ecosystem.";
        },
        { 
            name = "Ashutosh Yadav"; 
            title = "Media Production Manager"; 
            image = "ashutosh.jpg"; 
            bio = "Ashutosh delivers high-quality rendered content at lightning speed. When we need to take our message to the next level, he is always required.";
        },
    ];

    private var projects: [T.Project] = [
        { 
            id = 1; 
            name = "Waterway Labs"; 
            backendCanisterId = "rbqtt-7yaaa-aaaal-qcndq-cai"; 
            frontendCanisterId="qm6x5-qqaaa-aaaal-qcnea-cai"; 
            websiteURL="waterwaylabs.xyz"; 
            githubLink="https://github.com/jamesbeadle/WaterwayLabs"; 
            socialLinks=[]; 
            status=#Development; 
            description="Web3 Technology Company";
            summary="Waterway Labs is a Web3 Technology Company decentralising web services using blockchain technology. Our mission is to build a more equitable world by introducing users to the concept of owning the services they use.";
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
            description="Web3 Sports Governed by the Fans";
            summary=
                "FootballGod is the brain of our footballing ecosystem, with real time football data governed by football fans through the FootballGod data explorers. 
                Fans earn FPL whilst helping maintain our valuable dataset, allowing us to drive football related apps with real time, verified data. 
                FootballGod will be home to our fixed odds football betting service, offering fans the only way to bet on every professional football game in the world.";
            mainColour="#7F56F1";
            secondaryColour="";
            thirdColour=""; 
            },
        { 
            id = 3; 
            name = "OpenFPL"; 
            backendCanisterId = "y22zx-giaaa-aaaal-qmzpq-cai"; 
            frontendCanisterId="5gbds-naaaa-aaaal-qmzqa-cai"; 
            websiteURL="openfpl.xyz/"; 
            githubLink="https://github.com/jamesbeadle/OpenFPL"; 
            socialLinks=[("X", "https://x.com/OpenFPL_DAO")];
             status=#Decentralised;
            description="Decentralised Fantasy Football";
            summary="OpenFPL is a decentralised fantasy football game for the Premier League built to reward football fans frequently for their footballing knowledge.
                OpenFPL's unique gameplay rules are designed to engage fans year round, creating a unique experience enhanced by token related features. 
                OpenFPL has the world's first community based player valuations, showcasing the valuable utility of a governance backed dataset. 
                OpenFPL operates entirely on the blockchain without third party dependencies.";
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
            githubLink="https://github.com/jamesbeadle/OpenWSL"; 
            socialLinks=[("X", "https://x.com/OpenFPL_DAO")];
            status=#Development;
            description="Decentralised fantasy football";
            summary="OpenWSL is decentralised fantasy football based on the Women's Super League. 
            OpenWSL has been created to enhance women's football by providing the same incentives for participation as our flagship Premier League fantasy football game. 
            OpenWSL operates alongside OpenFPL to increase WSL popularity along with introducing more women to  blockchain technology.";
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
            description="Become a football agent today";
            summary="Transfer Kings is our upcoming purchase to play football agency game. 
            Groups of friends will be able to setup their own agency, competing against each other for custom reward pools. 
            Transfer Kings is designed to span multiple seasons and international tournaments, allowing your contracted players to achieve their expected career goals. 
            Designed for the football expert that can spot prospects around the world, Transfer Kings is the worldwide football game Web3 has been waiting for.";
            mainColour="#2D64E3";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 6; 
            name = "GolfPad"; 
            backendCanisterId = "elbip-aiaaa-aaaal-qjfhq-cai"; 
            frontendCanisterId="gw4gh-taaaa-aaaal-qjfia-cai"; 
            websiteURL="golfpad.xyz/"; 
            githubLink="https://github.com/jamesbeadle/GolfPad"; 
            socialLinks=[("X", "https://x.com/GolfPadDAO")]; 
            status=#Development;
            description="Golf meets Web3";
            summary="GolfPad gives golfers of all levels a new dimension to their game. 
            GolfPad focuses on individual achievements throughout your round rather than a single round's total score. 
            This allows you to compete against your friends within a new framework, training your golf game for new scenarios.";
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
            description="Decentralised business management";
            summary="OpenBook is evolving into a comprehensive, 100% on-chain business management platform. 
            OpenBook's initial offering of sales, accountancy, recruitment, timesheet and task management 
            are just the first step on delivering the perfect single SaaS for businesses at the lowest possible price.";
            mainColour="#66E094";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 8; name = "OpenBeats"; 
            backendCanisterId = "27l52-5aaaa-aaaal-qr6ta-cai"; 
            frontendCanisterId="2yk3o-qyaaa-aaaal-qr6tq-cai"; 
            websiteURL="openbeats.xyz"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Design;
            description="Decentralised Audio Production";
            summary="OpenBeats is a decentralised audio production platform allowing artists to earn as producers collaborate. 
            Create tracks using audio samples from the OpenBeats library, earning creators of samples a share the monthly subscription revenue.";
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
            description="Build Your Cooking Community";
            summary="OpenChef is designed to enable chefs to earn as they help people within their local community. 
            Chefs will create projects that receive funding through sponsorship, charitable donations and a share of premium content subscriptions. 
            This funding will be used to feed the community, giving a chef the opportunity to show off their passion for cooking through charitable content.";
            mainColour="#F55454";
            secondaryColour="";
            thirdColour="";
            },
        { 
            id = 10; 
            name = "ICPFA"; 
            backendCanisterId = "qxz7x-niaaa-aaaal-qdidq-cai"; 
            frontendCanisterId="r2x3z-caaaa-aaaal-qdiea-cai"; 
            websiteURL="https://icpfa.org"; 
            githubLink=""; 
            socialLinks=[]; 
            status=#Development;
            description="Supporting community football";
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
            description="The Future Of Social Care";
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

    public shared query func getTeamMembers() : async Result.Result<[DTOs.TeamMemberDTO], T.Error>{
        return #ok(teamMembers);
    };

    public shared query func getLogs() : async Result.Result<[Base.SystemLog], T.Error>{
        return #ok(logs);
    };

    public shared ({ caller }) func submitForm(dto: DTOs.SubmitContactFormDTO) : async Result.Result<(), T.Error> {
        let submittedById = Principal.toText(caller);

        let newSubmission: T.FormSubmission = {
            contact = dto.contact;
            message = dto.message;
            name = dto.name;
            status = #Unread;
            submittedBy = submittedById;
            submittedOn = Time.now();
        };

        let formSubmissionsBuffer = Buffer.fromArray<T.FormSubmission>(formSubmissions);
        formSubmissionsBuffer.add(newSubmission);
        formSubmissions := Buffer.toArray(formSubmissionsBuffer);

        return #ok();
    };

    public shared ({ caller }) func getFormSubmissions() : async Result.Result<[T.FormSubmission], T.Error>{
        assert isManager(Principal.toText(caller));
        return #ok(formSubmissions);
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
        let approvedCaller = Array.find<Base.CanisterId>(Environment.APPROVED_CANISTERS, func(canisterId: Base.CanisterId) : Bool {
            canisterId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };

    private func isCallerAdmin(callerPrincipalId: Base.CanisterId) : Bool {
        let approvedCaller = Array.find<Base.CanisterId>([Environment.MASTER_PRINCIPAL_ID], func(principalId: Base.CanisterId) : Bool {
            principalId == callerPrincipalId;
        });

        return Option.isSome(approvedCaller);
    };

    public shared ({ caller }) func getProjectCanisterInfo(projectId: T.ProjectId) : async Result.Result<[DTOs.CanisterDTO], T.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        
        let projectResult = Array.find<T.Project>(projects, func(foundProject: T.Project) : Bool {
            foundProject.id == projectId;
        });

        switch(projectResult){
            case (?project){
                let canisterBuffer = Buffer.fromArray<DTOs.CanisterDTO>([]);
                
                let IC : Management.Management = actor (Environment.Default);
                let backend_canister_actor = actor (project.backendCanisterId) : actor {};
                let frontend_canister_actor = actor (project.frontendCanisterId) : actor {};

                let backendCanisterStatusResult = await Utilities.getCanisterStatus_(backend_canister_actor, IC);
                switch(backendCanisterStatusResult){
                    case(?backendCanisterStatus){
                        canisterBuffer.add({
                            canisterId = project.backendCanisterId;
                            canisterName = "Backend";
                            computeAllocation = backendCanisterStatus.settings.compute_allocation;
                            cycles = backendCanisterStatus.cycles;
                        })
                    };
                    case (null){}
                };
                
                let frontendCanisterStatusResult = await Utilities.getCanisterStatus_(frontend_canister_actor, IC);
                switch(frontendCanisterStatusResult){
                    case(?frontendCanisterStatus){
                        canisterBuffer.add({
                            canisterId = project.backendCanisterId;
                            canisterName = "Frontend";
                            computeAllocation = frontendCanisterStatus.settings.compute_allocation;
                            cycles = frontendCanisterStatus.cycles;
                        })
                    };
                    case (null){}
                };

                return #ok(Buffer.toArray(canisterBuffer));      
            };
            case (null){}
        };        
        return #err(#NotFound);
    };

    public shared ({ caller }) func topupCanister(canisterId: Base.CanisterId, cycles: Nat) : async Result.Result<(), T.Error> {
        assert isCallerAdmin(Principal.toText(caller));
        let canister_actor = actor (canisterId) : actor {};
             
        let IC : Management.Management = actor (Environment.Default);
        let _ = await Utilities.topup_canister_(canister_actor, IC, cycles);
        return #ok();
    };

    private func isManager(principalId: Base.PrincipalId) : Bool {
        let foundManager = Array.find<Base.PrincipalId>(Environment.MANAGER_PRINCIPAL_IDS, func(foundPrincipalId: Base.PrincipalId) : Bool {
            foundPrincipalId == principalId;
        });
        return Option.isSome(foundManager);
    };

    private func updateDataHash(category : Text) : async () {
      let hashBuffer = Buffer.fromArray<Base.DataHash>([]);
      var updated = false;

      for (hashObj in Iter.fromArray(dataHashes)) {
        if (hashObj.category == category) {
          let randomHash = await SHA224.getRandomHash();
          hashBuffer.add({ category = hashObj.category; hash = randomHash });
          updated := true;
        } else { hashBuffer.add(hashObj) };
      };

      if(not updated){
          let randomHash = await SHA224.getRandomHash();
          hashBuffer.add({ category = category; hash = randomHash });
      };

      dataHashes := Buffer.toArray<Base.DataHash>(hashBuffer);
    };


    system func preupgrade() {
    };

    system func postupgrade() {
      
      ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback); 
    };

    private func postUpgradeCallback() : async (){
        await updateDataHash("projects");
    };

}
