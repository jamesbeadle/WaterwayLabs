import BaseTypes "mo:waterway-mops/BaseTypes";
import FootballTypes "mo:waterway-mops/FootballTypes";

module DTOs {


  public type PlayerDTO = {
    id : Nat16;
    clubId : FootballTypes.ClubId;
    position : FootballTypes.PlayerPosition;
    firstName : Text;
    lastName : Text;
    shirtNumber : Nat8;
    valueQuarterMillions : Nat16;
    dateOfBirth : Int;
    nationality : BaseTypes.CountryId;
    status : FootballTypes.PlayerStatus;
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
        status : FootballTypes.FixtureStatusType;
        highestScoringPlayerId : Nat16;
        events : [FootballTypes.PlayerEventData];
    };



    public type FootballLeagueDTO = {
      id: FootballTypes.LeagueId;
      name: Text;
      abbreviation: Text;
      teamCount: Nat8;
      relatedGender: BaseTypes.Gender;
      governingBody: Text;
      formed: Int;
      countryId: BaseTypes.CountryId;
      logo: Blob;
    };
};
