import ITeams from './ITeams';

export default interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: boolean,
  teamHome?: ITeams,
  teamAway?: ITeams
}
