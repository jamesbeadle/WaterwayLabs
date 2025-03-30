import Enums "../enums/enums";

module SupportQueries{
    public type GetSupportQueries = {
        app: ?Enums.WaterwayLabsApp;
        
    };

    public type SupportQueries = {
        supportQueries: [SupportQuery];
    };

    public type SupportQuery = {

    };  
}