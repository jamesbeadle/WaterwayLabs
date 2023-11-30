import T "./types";
import List "mo:base/List";

module DTOs {

  public type ProfileDTO = {
    principalId : Text;
    displayName : Text;
    profilePicture : Blob;
    createDate : Int;
  };

};
