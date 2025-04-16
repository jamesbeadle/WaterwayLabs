import MopsEnums "mo:waterway-mops/Enums";

module SupportQueries{
    public type GetSupportQueries = {
        app: ?MopsEnums.WaterwayLabsApp;
        
    };

    public type SupportQueries = {
        supportQueries: [SupportQuery];
    };

    public type SupportQuery = {

    };  
}