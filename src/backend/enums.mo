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
        #Active;
        #Assigned;
        #Closed;
        #New;
        #OnHold;
        #Resolved;
    };

    public type SupportQueryStatus = {
        #New;
        #Assigned;
        #Active;
        #OnHold;
        #Resolved;
        #Closed;
    };
};
