import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import DTOs "DTOs";
import Profiles "profiles";
import Account "Account";
import Book "book";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Result "mo:base/Result";
import Option "mo:base/Option";
import T "types";
import List "mo:base/List";
import Timer "mo:base/Timer";
import Time "mo:base/Time";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Int "mo:base/Int";
import TrieMap "mo:base/TrieMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Utilities "utilities";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Int16 "mo:base/Int16";
import Int64 "mo:base/Int64";
import SHA224 "./SHA224";

actor Self {

  let profilesInstance = Profiles.Profiles();
  let bookInstance = Book.Book();

  private var dataCacheHashes : List.List<T.DataCache> = List.fromArray([{
    category = "system_state";
    hash = "DEFAULT_VALUE";
  }]);

  //Profile Canister

  private func getProfiles() : [(Text, T.Profile)] {
    return profilesInstance.getProfiles();
  };

  public query func getSystemState() : async T.SystemState {

    return {};
  };

  public shared ({ caller }) func getProfileDTO() : async DTOs.ProfileDTO {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    var displayName = "";
    var profilePicture = Blob.fromArray([]);
    var createDate : Int = 0;

    var profile = profilesInstance.getProfile(Principal.toText(caller));

    if (profile == null) {
      profilesInstance.createProfile(Principal.toText(caller), Principal.toText(caller));
      profile := profilesInstance.getProfile(Principal.toText(caller));
    };

    switch (profile) {
      case (null) {};
      case (?p) {
        displayName := p.displayName;
        profilePicture := p.profilePicture;
        createDate := p.createDate;
      };
    };

    let profileDTO : DTOs.ProfileDTO = {
      principalId = principalId;
      displayName = displayName;
      profilePicture = profilePicture;
      createDate = createDate;
    };

    return profileDTO;
  };

  public shared query ({ caller }) func isDisplayNameValid(displayName : Text) : async Bool {
    assert not Principal.isAnonymous(caller);
    return profilesInstance.isDisplayNameValid(displayName);
  };

  public shared ({ caller }) func updateDisplayName(displayName : Text) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let invalidName = not profilesInstance.isDisplayNameValid(displayName);
    assert not invalidName;

    var profile = profilesInstance.getProfile(Principal.toText(caller));
    switch (profile) {
      case (null) {
        profilesInstance.createProfile(Principal.toText(caller), displayName);
        profile := profilesInstance.getProfile(Principal.toText(caller));
      };
      case (?foundProfile) {};
    };

    return profilesInstance.updateDisplayName(Principal.toText(caller), displayName);
  };

  public shared ({ caller }) func updateProfilePicture(profilePicture : Blob) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);

    let sizeInKB = Array.size(Blob.toArray(profilePicture)) / 1024;
    if (sizeInKB > 4000) {
      return #err(#NotAllowed);
    };

    return profilesInstance.updateProfilePicture(Principal.toText(caller), profilePicture);
  };

  public shared query func getDataHashes() : async [T.DataCache] {
    return List.toArray(dataCacheHashes);
  };

  //stable variable backup
  private stable var stable_profiles : [(Text, T.Profile)] = [];
  private stable var stable_data_cache_hashes : [T.DataCache] = [];

  system func preupgrade() {

    stable_profiles := profilesInstance.getProfiles();
    stable_data_cache_hashes := List.toArray(dataCacheHashes);
  };

  system func postupgrade() {
    profilesInstance.setData(stable_profiles);
    dataCacheHashes := List.fromArray(stable_data_cache_hashes);
  };
};
