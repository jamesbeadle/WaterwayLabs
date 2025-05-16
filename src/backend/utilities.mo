import Enums "mo:waterway-mops/product/wwl/enums";
import Hash "mo:base/Hash";
import Nat32 "mo:base/Nat32";
module {

    public func appEquals(a : Enums.WaterwayLabsApp, b : Enums.WaterwayLabsApp) : Bool {
        a == b;
    };
    public func appHash(key : Enums.WaterwayLabsApp) : Hash.Hash {
        let val = switch (key) {
            case (#FootballGod) 1;
            case (#ICF1) 2;
            case (#ICFC) 3;
            case (#ICGC) 4;
            case (#ICPCasino) 5;
            case (#ICPFA) 6;
            case (#JeffBets) 7;
            case (#OpenBook) 8;
            case (#OpenCare) 9;
            case (#OpenChef) 10;
            case (#OpenFPL) 11;
            case (#OpenWSL) 12;
            case (#TransferKings) 13;
            case (#WaterwayLabs) 14;
            case (#OpenBeats) 15;
            case (#GolfPad) 16;
        };

        Nat32.fromNat(val % (2 ** 32 - 1));

    };
};
