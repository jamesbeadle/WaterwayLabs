import Result "mo:base/Result";
import BaseTypes "mo:waterway-mops/BaseTypes";
import DataHashQueries "../queries/data_hash_queries";
import MopsEnums "mo:waterway-mops/Enums";

module {
  public class DataHashesManager() {

    private var dataHashes : [BaseTypes.DataHash] = [];
    public func getStableDataHashes() : [BaseTypes.DataHash] { dataHashes };
    public func setStableDataHashes(stable_data_hashes : [BaseTypes.DataHash]) {
      dataHashes := stable_data_hashes;
    };

    public func getDataHashes(_ : DataHashQueries.GetDataHashes) : Result.Result<DataHashQueries.DataHashes, MopsEnums.Error> {
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
