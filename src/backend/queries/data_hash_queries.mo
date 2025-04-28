module DataHashQueries {

    public type GetDataHashes = {};
    public type DataHashes = {
        dataHashes: [DataHash];
    };
    public type DataHash = {
        category : Text;
        hash : Text;
    };
}