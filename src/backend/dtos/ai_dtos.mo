import BaseTypes "mo:waterway-mops/BaseTypes";
import FootballTypes "mo:waterway-mops/FootballTypes";

module AIDTOs {


    public type PlayerDTO = {
        id : Nat16;
        clubId : FootballTypes.ClubId;
        position : Text;
        firstName : Text;
        lastName : Text;
        shirtNumber : Nat8;
        valueQuarterMillions : Nat16;
        dateOfBirth : Int;
        nationality : BaseTypes.CountryId;
        status : Text;
    };

    public type FixtureDTO = {
        id : Nat32;
        seasonId : FootballTypes.SeasonId;
        gameweek : FootballTypes.GameweekNumber;
        kickOff : Int;
        homeClubId : FootballTypes.ClubId;
        awayClubId : FootballTypes.ClubId;
        homeGoals : Nat8;
        awayGoals : Nat8;
        status : Text;
        highestScoringPlayerId : Nat16;
        events : [PlayerEventDataDTO];
    };

    public type PlayerEventDataDTO = {
        fixtureId : FootballTypes.FixtureId;
        playerId : Nat16;
        eventType : Text;
        eventStartMinute : Nat8;
        eventEndMinute : Nat8;
        clubId : FootballTypes.ClubId;
    };

    public type ManagerSnapshotDTO = {
        principalId : Text;
        username : Text;
        favouriteClubId : ?FootballTypes.ClubId;
        monthlyBonusesAvailable : Nat8;
        transfersAvailable : Nat8;
        bankQuarterMillions : Nat16;
        teamValueQuarterMillions : Nat16;
        playerIds : [FootballTypes.PlayerId];
        captainId : FootballTypes.PlayerId;
        gameweek : FootballTypes.GameweekNumber;
        goalGetterGameweek : FootballTypes.GameweekNumber;
        goalGetterPlayerId : FootballTypes.PlayerId;
        passMasterGameweek : FootballTypes.GameweekNumber;
        passMasterPlayerId : FootballTypes.PlayerId;
        noEntryGameweek : FootballTypes.GameweekNumber;
        noEntryPlayerId : FootballTypes.PlayerId;
        teamBoostGameweek : FootballTypes.GameweekNumber;
        teamBoostClubId : FootballTypes.ClubId;
        safeHandsGameweek : FootballTypes.GameweekNumber;
        safeHandsPlayerId : FootballTypes.PlayerId;
        captainFantasticGameweek : FootballTypes.GameweekNumber;
        captainFantasticPlayerId : FootballTypes.PlayerId;
        oneNationGameweek : FootballTypes.GameweekNumber;
        oneNationCountryId : BaseTypes.CountryId;
        prospectsGameweek : FootballTypes.GameweekNumber;
        braceBonusGameweek : FootballTypes.GameweekNumber;
        hatTrickHeroGameweek : FootballTypes.GameweekNumber;
        points : Int16;
        monthlyPoints : Int16;
        seasonPoints : Int16;
        transferWindowGameweek : FootballTypes.GameweekNumber;
        month : BaseTypes.CalendarMonth;
        seasonId: FootballTypes.SeasonId;
    };
};
