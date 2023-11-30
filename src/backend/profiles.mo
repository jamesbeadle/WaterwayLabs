import T "types";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Account "Account";
import Result "mo:base/Result";
import { now } "mo:base/Time";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

module {
  public class Profiles() {

    private var userProfiles : HashMap.HashMap<Text, T.Profile> = HashMap.HashMap<Text, T.Profile>(100, Text.equal, Text.hash);

    public func setData(stable_profiles : [(Text, T.Profile)]) {
      userProfiles := HashMap.fromIter<Text, T.Profile>(
        stable_profiles.vals(),
        stable_profiles.size(),
        Text.equal,
        Text.hash,
      );
    };

    public func getProfiles() : [(Text, T.Profile)] {
      return Iter.toArray(userProfiles.entries());
    };

    public func getProfile(principalId : Text) : ?T.Profile {
      return userProfiles.get(principalId);
    };

    public func isWalletValid(walletAddress : Text) : Bool {
      let account_id = Account.decode(walletAddress);
      switch account_id {
        case (#ok array) {
          if (Account.validateAccountIdentifier(Blob.fromArray(array))) {
            return true;
          };
        };
        case (#err err) {
          return false;
        };
      };

      return false;
    };

    public func createProfile(principalId : Text, displayName : Text) : () {
      if (userProfiles.get(principalId) == null) {
        let newProfile : T.Profile = {
          principalId = principalId;
          displayName = displayName;
          profilePicture = Blob.fromArray([]);
          termsAccepted = false;
          createDate = now();
        };

        userProfiles.put(principalId, newProfile);
      };
    };

    public func isDisplayNameValid(displayName : Text) : Bool {

      if (Text.size(displayName) < 3 or Text.size(displayName) > 20) {
        return false;
      };

      let isAlphanumeric = func(s : Text) : Bool {
        let chars = Text.toIter(s);
        for (c in chars) {
          if (not ((c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z') or (c >= '0' and c <= '9') or (c == ' '))) {
            return false;
          };
        };
        return true;
      };

      if (not isAlphanumeric(displayName)) {
        return false;
      };

      for (profile in userProfiles.vals()) {
        if (profile.displayName == displayName) {
          return false;
        };
      };

      return true;
    };

    public func updateDisplayName(principalId : Text, displayName : Text) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalId);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          if (existingProfile.displayName == displayName) {
            return #ok(());
          };
          let nameValid = isDisplayNameValid(displayName);
          if (not nameValid) {
            return #err(#NotAllowed);
          };

          let updatedProfile : T.Profile = {
            principalId = existingProfile.principalId;
            displayName = displayName;
            profilePicture = existingProfile.profilePicture;
            termsAccepted = existingProfile.termsAccepted;
            createDate = existingProfile.createDate;
          };

          userProfiles.put(principalId, updatedProfile);

          return #ok(());
        };
      };
    };

    public func updateProfilePicture(principalId : Text, profilePicture : Blob) : Result.Result<(), T.Error> {
      let existingProfile = userProfiles.get(principalId);
      switch (existingProfile) {
        case (null) {
          return #err(#NotFound);
        };
        case (?existingProfile) {
          let updatedProfile : T.Profile = {
            principalId = existingProfile.principalId;
            displayName = existingProfile.displayName;
            termsAccepted = existingProfile.termsAccepted;
            profilePicture = profilePicture;
            createDate = existingProfile.createDate;
          };

          userProfiles.put(principalId, updatedProfile);
          return #ok(());
        };
      };
    };

  };
};
