import Management "cleanup/management";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";

module Utilitiles {

  public func getCanisterStatus_(a : actor {}, IC : Management.Management) : async ?Management.canister_status_result {
    let cid = { canister_id = Principal.fromActor(a) };
    let result = await (
        IC.canister_status({
        canister_id = cid.canister_id;
        }),
    );
    return ?result;
  };

  public func topup_canister_(a : actor {}, IC : Management.Management, cycles: Nat) : async () {
    let cid = { canister_id = Principal.fromActor(a) };
    Cycles.add<system>(cycles);
    await (
      IC.deposit_cycles({
        canister_id = cid.canister_id;
      }),
    );
  }; 
}