import List "mo:base/List";

module Types {

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #InvalidData;
  };

  public type Profile = {
    principalId : Text;
    displayName : Text;
    termsAccepted : Bool;
    profilePicture : Blob;
    createDate : Int;
  };

  public type Account = {
    owner : Principal;
    subaccount : Blob;
  };

  public type DataCache = {
    category : Text;
    hash : Text;
  };

  public type SystemState = {

  };

};
