import MopsEnums "mo:waterway-mops/Enums";
import MopsIds "mo:waterway-mops/Ids";
import MopsTypes "mo:waterway-mops/BaseTypes";
import BaseTypes "mo:waterway-mops/BaseTypes";

/* ----- Mops Packages ----- */

import Array "mo:base/Array";
import Int "mo:base/Int";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";

/* ----- Queries ----- */

import ApplicationLogQueries "queries/application_log_queries";
import WWLCanisterQueries "mo:waterway-mops/canister-management/CanisterQueries";
import WWLCanisterCommands "mo:waterway-mops/canister-management/CanisterCommands";
import Ids "mo:waterway-mops/Ids";
import DataHashQueries "queries/data_hash_queries";
import ProjectQueries "queries/project_queries";
import SupportQueryQueries "queries/support_query_queries";
import TeamMemberQueries "queries/team_member_queries";
import CanisterCommands "./commands/canister_management_commands";

/* ----- Commands ----- */

import ApplicationLogCommands "commands/application_log_commands";
import SupportQueryCommands "commands/support_query_commands";
import ProjectCommands "commands/project_commands";
import TeamMemberCommands "commands/team_member_commands";

/* ----- Managers ----- */

import ApplicationLogsManager "Managers/application_logs_manager";
import CanistersManager "Managers/canisters_manager";
import DataHashesManager "Managers/data_hashes_manager";
import ProjectsManager "Managers/projects_manager";
import SupportQueriesManager "Managers/support_queries_manager";
import TeamMembersManager "Managers/team_members_manager";

/* ----- Only Stable Variables Should Use Types ----- */

import AppTypes "types/app_types";

/* ----- Application Environment & Utility Files ----- */

import Environment "environment";

actor Self {

    /* ----- Stable Canister Variables ----- */

    private stable var stable_data_hashes : [MopsTypes.DataHash] = [];
    private stable var stable_projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)] = [];
    private stable var stable_team_members : [AppTypes.TeamMember] = [];
    private stable var stable_application_logs : [MopsTypes.ApplicationLog] = [];
    private stable var stable_support_queries : [AppTypes.SupportQuery] = [];
    private stable var stable_canisters_cycles_topups : [AppTypes.CanisterCyclesTopup] = [];
    private stable var stable_project_id : Ids.ProjectId = 1;
    private stable var stable_app_status : MopsTypes.AppStatus = {
        onHold = true;
        version = "";
    };
    private stable var stable_canisters_check_timer_id : Nat = 0;

    /* ----- Domain Object Managers ----- */

    let dataHashesManager = DataHashesManager.DataHashesManager();
    let projectsManager = ProjectsManager.ProjectsManager();
    let teamMembersManager = TeamMembersManager.TeamMembersManager();
    let applicationLogsManager = ApplicationLogsManager.ApplicationLogsManager();
    let supportQueriesManager = SupportQueriesManager.SupportQueriesManager();
    let canistersManager = CanistersManager.CanistersManager();

    /* ----- General App Queries ----- */

    public shared query func getAppStatus() : async Result.Result<BaseTypes.AppStatus, MopsEnums.Error> {
        return #ok(stable_app_status);
    };

    /* ----- Data Hash Queries ----- */

    public shared query func getDataHashes(dto : DataHashQueries.GetDataHashes) : async Result.Result<DataHashQueries.DataHashes, MopsEnums.Error> {
        return dataHashesManager.getDataHashes(dto);
    };

    /* ----- Projects Queries ----- */

    public shared ({ caller }) func getProjects(dto : ProjectQueries.GetProjects) : async Result.Result<ProjectQueries.Projects, MopsEnums.Error> {
        return projectsManager.getProjects(dto);
    };

    /* ----- Projects Commands ----- */

    public shared ({ caller }) func createProject(dto : ProjectCommands.CreateProject) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));
        return await projectsManager.createProject(dto);
    };

    public shared ({ caller }) func updateProject(dto : ProjectCommands.UpdateProject) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));
        return await projectsManager.updateProject(dto);
    };

    public shared ({ caller }) func setProjectOnHold(dto : ProjectCommands.SetProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));
        return await projectsManager.setProjectOnHold(dto);
    };

    public shared ({ caller }) func removeProjectOnHold(dto : ProjectCommands.RemoveProjectOnHold) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));
        return await projectsManager.removeProjectOnHold(dto);
    };

    public shared ({ caller }) func deleteProject(dto : ProjectCommands.DeleteProject) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));
        return await projectsManager.deleteProject(dto);
    };

    /* ----- Team Member Queries ----- */

    public shared query func getTeamMembers() : async Result.Result<[TeamMemberQueries.TeamMember], MopsEnums.Error> {
        return #ok(stable_team_members);
    };

    /* ----- Team Member Commands ----- */

    public shared func addTeamMember(dto : TeamMemberCommands.AddTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.addTeamMember(dto);
    };

    public shared func removeTeamMember(dto : TeamMemberCommands.RemoveTeamMember) : async Result.Result<(), MopsEnums.Error> {
        return await teamMembersManager.removeTeamMember(dto);
    };

    /* ----- Canisters Queries ----- */

    public shared ({ caller }) func getProjectCanisters(dto : WWLCanisterQueries.GetProjectCanisters) : async Result.Result<WWLCanisterQueries.ProjectCanisters, MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.getProjectCanisters(dto, projects);
    };

    public shared ({ caller }) func getCanisterInfo(dto : WWLCanisterQueries.GetCanisterInfo) : async Result.Result<WWLCanisterQueries.CanisterInfo, MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        return await canistersManager.getCanisterInfo(dto);
    };

    public shared ({ caller }) func listCanisterSnapshots(dto : WWLCanisterQueries.ListCanisterSnapshots) : async Result.Result<[WWLCanisterQueries.CanisterSnapshot], MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.listCanisterSnapshots(dto, projects);
    };

    /* ----- Canisters Commands ----- */

    public shared ({ caller }) func topupCanister(dto : WWLCanisterCommands.TopupCanister) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.topupCanister(dto, projects);
    };

    public shared ({ caller }) func setCanisterComputeAllocation(dto : WWLCanisterCommands.SetComputeAllocation) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setComputeAllocation(dto, projects);
    };

    public shared ({ caller }) func setCanisterMemoryAllocation(dto : WWLCanisterCommands.SetMemoryAllocation) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setMemoryAllocation(dto, projects);
    };

    public shared ({ caller }) func setCanisterFreezeThreshold(dto : WWLCanisterCommands.SetFreezingThreshold) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.setFreezingThreshold(dto, projects);
    };

    public shared ({ caller }) func addCanisterController(dto : CanisterCommands.AddController) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.addController(dto, projects);
    };

    public shared ({ caller }) func removeCanisterController(dto : CanisterCommands.RemoveController) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.removeController(dto, projects);
    };

    public shared ({ caller }) func takeCanisterSnapshot(dto : WWLCanisterCommands.TakeCanisterSnapshot) : async Result.Result<WWLCanisterCommands.CanisterSnapshot, MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.takeCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func loadCanisterSnapshot(dto : WWLCanisterCommands.LoadCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.loadCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func deleteCanisterSnapshot(dto : WWLCanisterCommands.DeleteCanisterSnapshot) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.deleteCanisterSnapshot(dto, projects);
    };

    public shared ({ caller }) func startCanister(dto : WWLCanisterCommands.StartCanister) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.startCanister(dto, projects);
    };

    public shared ({ caller }) func stopCanister(dto : WWLCanisterCommands.StopCanister) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.stopCanister(dto, projects);
    };

    public shared ({ caller }) func deleteCanister(dto : WWLCanisterCommands.DeleteCanister) : async Result.Result<(), MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));

        let projects = projectsManager.getStableProjects();
        return await canistersManager.deleteCanister(dto, projects);
    };

    /* ----- Application Log Queries ----- */

    public shared query func getApplicationLogs(dto : ApplicationLogQueries.GetApplicationLogs) : async Result.Result<ApplicationLogQueries.ApplicationLogs, MopsEnums.Error> {
        return applicationLogsManager.getApplicationLogs(dto);
    };

    /* ----- Application Log Commands ----- */

    public shared ({ caller }) func addApplicationLog(dto : ApplicationLogCommands.AddApplicationLog) : async Result.Result<(), MopsEnums.Error> {
        assert isApprovedCanister(Principal.toText(caller));
        let _ = await applicationLogsManager.addApplicationLog(dto);
        return #ok();
    };

    /* ----- Support Query Queries ----- */

    public shared ({ caller }) func getSupportQueries(dto : SupportQueryQueries.GetSupportQueries) : async Result.Result<SupportQueryQueries.GetSupportQueries, MopsEnums.Error> {
        assert not isCallerAdmin(Principal.toText(caller));
        return await supportQueriesManager.getSupportQueries(dto);
    };

    /* ----- Support Query Commands ----- */

    public shared ({ caller }) func createSupportQuery(dto : SupportQueryCommands.CreateSupportQuery) : async Result.Result<(), MopsEnums.Error> {
        let _ = Principal.toText(caller);
        let _ = await supportQueriesManager.createSupportQuery(dto);
        return #ok();
    };

    /* ----- Private Motoko Actor Functions ----- */

    private func isApprovedCanister(callerPrincipalId : MopsIds.CanisterId) : Bool {
        let approvedCaller = Array.find<MopsIds.CanisterId>(
            Environment.APPROVED_CANISTERS,
            func(canisterId : MopsIds.CanisterId) : Bool {
                canisterId == callerPrincipalId;
            },
        );

        return Option.isSome(approvedCaller);
    };

    private func isCallerAdmin(callerPrincipalId : MopsIds.PrincipalId) : Bool {
        if (Principal.isAnonymous(Principal.fromText(callerPrincipalId))) {
            return false;
        };
        let approvedCaller = Array.find<MopsIds.PrincipalId>(
            Environment.ADMIN_PRINCIPAL_IDS,
            func(principalId : MopsIds.PrincipalId) : Bool {
                principalId == callerPrincipalId;
            },
        );

        return Option.isSome(approvedCaller);
    };

    /* ----- Canister Lifecycle Management ----- */

    system func preupgrade() {
        getManagerStableVariables();

        if (stable_canisters_check_timer_id != 0) {
            Timer.cancelTimer(stable_canisters_check_timer_id);
        };
    };

    system func postupgrade() {
        setManagerStableVariables();
        // stable_canisters_check_timer_id := Timer.recurringTimer<system>(#seconds(86_400), checkCanisters);
        ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
    };

    private func getManagerStableVariables() {
        stable_data_hashes := dataHashesManager.getStableDataHashes();
        stable_projects := projectsManager.getStableProjects();
        stable_team_members := teamMembersManager.getStableTeamMembers();
        stable_application_logs := applicationLogsManager.getStableApplicationLogs();
        stable_support_queries := supportQueriesManager.getStableSupportQueries();
        stable_canisters_cycles_topups := canistersManager.getStableCanisterCyclesTopups();
        stable_project_id := projectsManager.getStableProjectId();
    };

    private func setManagerStableVariables() {
        dataHashesManager.setStableDataHashes(stable_data_hashes);
        projectsManager.setStableProjects(stable_projects);
        teamMembersManager.setStableTeamMembers(stable_team_members);
        applicationLogsManager.setStableApplicationLogs(stable_application_logs);
        supportQueriesManager.setStableSupportQueries(stable_support_queries);
        canistersManager.setStableCanisterCyclesTopups(stable_canisters_cycles_topups);
        projectsManager.setStableProjectId(stable_project_id);
    };

    private func postUpgradeCallback() : async () {
        var projects : [(MopsEnums.WaterwayLabsApp, AppTypes.Project)] = [
            (
                #WaterwayLabs,
                {
                    id = 1;
                    name = "Waterway Labs";
                    backendCanisterId = "rbqtt-7yaaa-aaaal-qcndq-cai";
                    frontendCanisterId = "qm6x5-qqaaa-aaaal-qcnea-cai";
                    websiteURL = "waterwaylabs.xyz";
                    githubLink = "https://github.com/jamesbeadle/WaterwayLabs";
                    socialLinks = [];
                    status = #Development;
                    description = "Web3 Technology Company";
                    summary = "Waterway Labs is a Web3 Technology Company decentralising web services using blockchain technology. Our mission is to build a more equitable world by introducing users to the concept of owning the services they use.";
                    mainColour = "#272727";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #WaterwayLabs;
                },
            ),
            (
                #ICFC,
                {
                    id = 2;
                    name = "ICFC";
                    backendCanisterId = "cfalf-4yaaa-aaaal-qshrq-cai";
                    frontendCanisterId = "cqh2i-5qaaa-aaaal-qshsa-cai";
                    websiteURL = "icfc.app";
                    githubLink = "https://github.com/jamesbeadle/icfc";
                    socialLinks = [];
                    status = #Decentralised;
                    description = "The World Football Club";
                    summary = "
                ICFC is on a mission to transform how football clubs are run by using the power of blockchain to decentralise club ownership and decision-making.
                Our platform is designed to drive local community engagement with a football club, building a foundation for future success.
                Token holders play a key role in shifting power from centralised ownership to local fans and supporters, ensuring they have a say in scouting, management, and key decisions.
                ";
                    mainColour = "#1979F2";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #ICFC;
                },
            ),
            (
                #FootballGod,
                {
                    id = 3;
                    name = "FootballGod";
                    backendCanisterId = "44kin-waaaa-aaaal-qbxra-cai";
                    frontendCanisterId = "43loz-3yaaa-aaaal-qbxrq-cai";
                    websiteURL = "footballgod.xyz";
                    githubLink = "https://github.com/jamesbeadle/football_god";
                    socialLinks = [];
                    status = #Decentralised;
                    description = "Web3 Sports Governed by the Fans";
                    summary = "FootballGod is the brain of our footballing ecosystem, with real time football data governed by football fans through the FootballGod data explorers.
                Fans earn FPL whilst helping maintain our valuable dataset, allowing us to drive football related apps with real time, verified data.
                FootballGod will be home to our fixed odds football betting service, offering fans the only way to bet on every professional football game in the world.";
                    mainColour = "#7F56F1";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #FootballGod;
                },
            ),
            (
                #OpenFPL,
                {
                    id = 4;
                    name = "OpenFPL";
                    backendCanisterId = "y22zx-giaaa-aaaal-qmzpq-cai";
                    frontendCanisterId = "5gbds-naaaa-aaaal-qmzqa-cai";
                    websiteURL = "openfpl.xyz/";
                    githubLink = "https://github.com/jamesbeadle/OpenFPL";
                    socialLinks = [("X", "https://x.com/OpenFPL_DAO")];
                    status = #Decentralised;
                    description = "Decentralised Fantasy Football";
                    summary = "OpenFPL is a decentralised fantasy football game for the Premier League built to reward football fans frequently for their footballing knowledge.
                OpenFPL's unique gameplay rules are designed to engage fans year round, creating a unique experience enhanced by token related features.
                OpenFPL has the world's first community based player valuations, showcasing the valuable utility of a governance backed dataset.
                OpenFPL operates entirely on the blockchain without third party dependencies.";
                    mainColour = "#2CE3A6";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #OpenFPL;
                },
            ),
            (
                #OpenWSL,
                {
                    id = 5;
                    name = "OpenWSL";
                    backendCanisterId = "5bafg-ayaaa-aaaal-qmzqq-cai";
                    frontendCanisterId = "5ido2-wqaaa-aaaal-qmzra-cai";
                    websiteURL = "openwsl.xyz";
                    githubLink = "https://github.com/jamesbeadle/OpenWSL";
                    socialLinks = [("X", "https://x.com/OpenFPL_DAO")];
                    status = #Development;
                    description = "Decentralised fantasy football";
                    summary = "OpenWSL is decentralised fantasy football based on the Women's Super League.
            OpenWSL has been created to enhance women's football by providing the same incentives for participation as our flagship Premier League fantasy football game.
            OpenWSL operates alongside OpenFPL to increase WSL popularity along with introducing more women to  blockchain technology.";
                    mainColour = "#F156D2";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #OpenWSL;
                },
            ),
            (
                #JeffBets,
                {
                    id = 6;
                    name = "Jeff Bets";
                    backendCanisterId = "cmdaz-kqaaa-aaaal-qshqa-cai";
                    frontendCanisterId = "hqy24-byaaa-aaaal-qshpq-cai";
                    websiteURL = "jeffbets.com";
                    githubLink = "https://github.com/jamesbeadle/jeffbets";
                    socialLinks = [];
                    status = #Decentralised;
                    description = "Decentralised fantasy football";
                    summary = "Jeff Bets is our decentralised football betting site centered around your own personalised AI Agent, Jeff.
            Jeff introduces the world to a new form of conversational betting, letting Jeff know rules for when to place bets on your behalf.
            User can now sit back, enjoying a game knowing bets happen automatically.
            Jeff understands complex patterns, placing these bets based on in-game events. Jeff works away in the background, ensuring you never miss a winning opportunity.
            ";
                    mainColour = "#0D0D0D";
                    secondaryColour = "#D7FE49";
                    thirdColour = "#D7FE49";
                    app = #JeffBets;
                },
            ),
            (
                #ICPFA,
                {
                    id = 7;
                    name = "ICPFA";
                    backendCanisterId = "qxz7x-niaaa-aaaal-qdidq-cai";
                    frontendCanisterId = "r2x3z-caaaa-aaaal-qdiea-cai";
                    websiteURL = "https://icpfa.org";
                    githubLink = "https://github.com/jamesbeadle/ICPFA";
                    socialLinks = [];
                    status = #Development;
                    description = "Supporting community football";
                    summary = "The ICPFA has been setup to support community grassroots football causes, funded by revenue from our football related applications.";
                    mainColour = "#FFFFFF";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #ICPFA;
                },
            ),
            (
                #TransferKings,
                {
                    id = 8;
                    name = "Transfer Kings";
                    backendCanisterId = "fpmh5-ziaaa-aaaal-qjfbq-cai";
                    frontendCanisterId = "f2lwq-yaaaa-aaaal-qjfca-cai";
                    websiteURL = "transferkings.xyz";
                    githubLink = "https://github.com/jamesbeadle/transferkings";
                    socialLinks = [];
                    status = #Design;
                    description = "Become a football agent today";
                    summary = "Transfer Kings is our upcoming purchase to play football agency game.
            Groups of friends will be able to setup their own agency, competing against each other for custom reward pools.
            Transfer Kings is designed to span multiple seasons and international tournaments, allowing your contracted players to achieve their expected career goals.
            Designed for the football expert that can spot prospects around the world, Transfer Kings is the worldwide football game Web3 has been waiting for.";
                    mainColour = "#2D64E3";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #TransferKings;
                },
            ),
            (
                #ICGC,
                {
                    id = 9;
                    name = "ICGC";
                    backendCanisterId = "elbip-aiaaa-aaaal-qjfhq-cai";
                    frontendCanisterId = "gw4gh-taaaa-aaaal-qjfia-cai";
                    websiteURL = "golfpad.xyz/";
                    githubLink = "https://github.com/jamesbeadle/GolfPad";
                    socialLinks = [("X", "https://x.com/GolfPadDAO")];
                    status = #Development;
                    description = "Golf meets Web3";
                    summary = "GolfPad gives golfers of all levels a new dimension to their game.
            GolfPad focuses on individual achievements throughout your round rather than a single round's total score.
            This allows you to compete against your friends within a new framework, training your golf game for new scenarios.";
                    mainColour = "#F4C802";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #ICGC;
                },
            ),
            (
                #OpenBook,
                {
                    id = 10;
                    name = "OpenBook";
                    backendCanisterId = "eur5j-5iaaa-aaaal-qcrva-cai";
                    frontendCanisterId = "etq35-qqaaa-aaaal-qcrvq-cai";
                    websiteURL = "openbook.services";
                    githubLink = "https://github.com/jamesbeadle/OpenBook";
                    socialLinks = [("X", "https://x.com/OpenBookDAO")];
                    status = #Development;
                    description = "Decentralised business management";
                    summary = "OpenBook is evolving into a comprehensive, 100% on-chain business management platform.
            OpenBook's initial offering of sales, accountancy, recruitment, timesheet and task management
            are just the first step on delivering the perfect single SaaS for businesses at the lowest possible price.";
                    mainColour = "#66E094";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #OpenBook;
                },
            ),
            (
                #OpenBeats,
                {
                    id = 11;
                    name = "OpenBeats";
                    backendCanisterId = "27l52-5aaaa-aaaal-qr6ta-cai";
                    frontendCanisterId = "2yk3o-qyaaa-aaaal-qr6tq-cai";
                    websiteURL = "openbeats.xyz";
                    githubLink = "https://github.com/jamesbeadle/OpenBeats";
                    socialLinks = [];
                    status = #Design;
                    description = "Decentralised Audio Production";
                    summary = "OpenBeats is a decentralised audio production platform allowing artists to earn as producers collaborate.
            Create tracks using audio samples from the OpenBeats library, earning creators of samples a share the monthly subscription revenue.";
                    mainColour = "#FF8D7D";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #OpenBeats;
                },
            ),
            (
                #OpenChef,
                {
                    id = 12;
                    name = "OpenChef";
                    backendCanisterId = "h3scj-4iaaa-aaaal-qjfpq-cai";
                    frontendCanisterId = "chjym-xaaaa-aaaal-qjfqa-cai";
                    websiteURL = "openchef.xyz";
                    githubLink = "https://github.com/jamesbeadle/OpenChef";
                    socialLinks = [];
                    status = #Design;
                    description = "Build Your Cooking Community";
                    summary = "OpenChef is designed to enable chefs to earn as they help people within their local community.
            Chefs will create projects that receive funding through sponsorship, charitable donations and a share of premium content subscriptions.
            This funding will be used to feed the community, giving a chef the opportunity to show off their passion for cooking through charitable content.";
                    mainColour = "#F55454";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #OpenChef;
                },
            ),
            (
                #OpenCare,
                {
                    id = 13;
                    name = "OpenCare";
                    backendCanisterId = "cai6y-2yaaa-aaaal-qjfqq-cai";
                    frontendCanisterId = "coktq-biaaa-aaaal-qjfrq-cai";
                    websiteURL = "opencare.services";
                    githubLink = "https://github.com/jamesbeadle/OpenCare";
                    socialLinks = [];
                    status = #Design;
                    description = "The Future Of Social Care";
                    summary = "OpenCare has been designed with care professionals and families who have elderly relatives in care-homes. Caring for the elderly will be a huge challenge for society going forwards and OpenCare will provide a caring, efficient and secure solution to help all stakeholders involved.";
                    mainColour = "#FF69B4";
                    secondaryColour = "";
                    thirdColour = "";
                    app = #OpenCare;
                },
            ),
        ];

        stable_projects := projects;

        projectsManager.setStableProjects(projects);

    };

    private func checkCanisters() : async () {
        await canistersManager.checkCanisters(stable_projects);
    };

};
