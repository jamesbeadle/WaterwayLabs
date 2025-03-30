module Enums {

    public type ProjectStatus = {
        #Design;
        #Development;
        #Beta;
        #Live;
        #Decentralised;
        #OnHold;
        #Cancelled;
        #Complete;
    };

    public type QueryStatus = {
        #Unread;
        #Read;
        #Resolved;
        #Ignored;
        #Flagged;
    };

    public type WaterwayLabsApp = {
        #WaterwayLabs;
        #ICFC;
        #FootballGod;
        #OpenFPL;
        #OpenWSL;
        #TransferKings;
        #JeffBets;
        #ICPFA;
        #ICGC;
        #ICF1;
        #OpenBook;
        #OpenChef;
        #ICPCasino;
        #OpenCare;
    };

    public type SupportQueryStatus = {
        #New;
        #Assigned;
        #Active;
        #OnHold;
        #Resolved;
        #Closed;
    };
}