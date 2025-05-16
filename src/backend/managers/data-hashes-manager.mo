import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import BaseTypes "mo:waterway-mops/base/types";
import DataHashQueries "../queries/data-hash-queries";
import MopsEnums "mo:waterway-mops/base/enums";
import SHA224 "mo:waterway-mops/base/def/sha224";

module {
  public class DataHashesManager() {

    private var dataHashes : [BaseTypes.DataHash] = [];
    public func getStableDataHashes() : [BaseTypes.DataHash] { dataHashes };
    public func setStableDataHashes(stable_data_hashes : [BaseTypes.DataHash]) {
      dataHashes := stable_data_hashes;
    };

    public func getDataHashes(_ : DataHashQueries.GetDataHashes) : Result.Result<DataHashQueries.DataHashes, MopsEnums.Error> {
      return #ok({
        dataHashes = dataHashes;
      })
    };

    public func updateDataHash(category : Text) : async () {
      let hashBuffer = Buffer.fromArray<BaseTypes.DataHash>([]);
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

  };
};
