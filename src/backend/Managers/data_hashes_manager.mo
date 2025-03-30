import MopsTypes "../types/mops_types";
import Result "mo:base/Result";
import MopsQueries "../queries/mops_queries";
import MopsEnums "../enums/mops_enums";
import AppQueries "../queries/app_queries";
import DataHashQueries "../queries/data_hash_queries";

module {
    public class DataHashesManager() {


        private var dataHashes: [MopsTypes.DataHash] = [];  
        public func getStableDataHashes() : [MopsTypes.DataHash] { dataHashes; };
        public func setStableDataHashes(stable_data_hashes: [MopsTypes.DataHash]) { dataHashes := stable_data_hashes; };

        public func getDataHashes() : async Result.Result<DataHashQueries.DataHashes, MopsEnums.Error> {
            return #ok({
                //TODO 
            });
        };

        /*
        public func updateAppStatus() : async Result.Result<(), MopsEnums.Error> {

        };




    private func updateDataHash(category : Text) : async () {
      let hashBuffer = Buffer.fromArray<MopsIds.DataHash>([]);
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

      dataHashes := Buffer.toArray<BaseTypes.DataHash>(hashBuffer);
    };


     
    private stable var  :  = [
      { category = "projects"; hash = "DEFAULT" },
      { category = "team_members"; hash = "DEFAULT" }
    ];
    */
    
    };
};
