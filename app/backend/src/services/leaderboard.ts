import { IPoints, ILeader, ITeams } from '../interfaces';
import TeamM from '../database/models/teamsM';
import MatchM from '../database/models/matchesM';

export default class LeaderBoardStats {
  constructor(
    private teamModel: typeof TeamM,
    private matchModel: typeof MatchM,
  ) {}

  async findData() {
    const teams = await this.teamModel.findAll();
    const match = await this.matchModel.findAll({
      where: 
      { inProgress: false },
    });
    return { teams, match };
  }

  static filterMatch(id: number, match: MatchM[]): MatchM[] {
    const filtered = match
      .filter(({ homeTeam, awayTeam }) => homeTeam === id || awayTeam === id);
    return filtered;
  }

  static filterHome(id: number, match: MatchM[]): MatchM[] {
    const filtered = match
      .filter(({ homeTeam }) => homeTeam === id);
    return filtered;
  }

  static filterAway(id: number, match: MatchM[]): MatchM[] {
    const filtered = match
      .filter(({ awayTeam }) => awayTeam === id);
    return filtered;
  }

  static calcPoints(p: IPoints, thisTeam: number, otherTeam: number,
  ) {
    if (thisTeam > otherTeam) {
      p.totalPoints += 3;
      p.totalVictories += 1;
    }
    if (thisTeam < otherTeam) {
      p.totalLosses += 1;
    }
    if (thisTeam === otherTeam) {
      p.totalPoints += 1;
      p.totalDraws += 1;
    }
  }

  static sumPoints(id: number, match: MatchM[]) {
    return match.reduce((acc, curr) => {
      if (curr.homeTeam === id) { this.calcPoints(acc, curr.homeTeamGoals, curr.awayTeamGoals);
      }
      if (curr.awayTeam === id) { this.calcPoints(acc, curr.awayTeamGoals, curr.homeTeamGoals);
      }
      acc.totalGames += 1;
      return acc;
    }, { totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0,
    });
  }

  static sumGoals(id: number, match: MatchM[]) {
    return match.reduce((acc, curr) => {
      if (curr.homeTeam === id) {
        acc.favor += curr.homeTeamGoals;
        acc.own += curr.awayTeamGoals;
      }
      if (curr.awayTeam === id) {
        acc.favor += curr.awayTeamGoals;
        acc.own += curr.homeTeamGoals;
      }
      return acc;
    }, { favor: 0, own: 0 });
  }

  static calcTotal(totalPoints: number, totalGames: number) {
    const points = (totalPoints / (totalGames * 3)) * 100;
    return points.toFixed(2);
  }

  static createBoard(teams: ITeams, points: IPoints, goals: { favor: number, own: number },
  ) {
    return {
      name: teams.teamName, totalPoints: points.totalPoints, totalGames: points.totalGames,
      totalVictories: points.totalVictories, totalDraws: points.totalDraws, totalLosses: points.totalLosses,
      goalsFavor: goals.favor, goalsOwn: goals.own, goalsBalance: goals.favor - goals.own,
      efficiency: LeaderBoardStats
        .calcTotal(points.totalPoints, points.totalGames),
    };
  }

  static orderPoints(one: ILeader, two: ILeader) {
    switch (true) {
      case (one.totalPoints > two.totalPoints):
        return -1;
      case (one.totalPoints < two.totalPoints):
        return 1;
      default:
        return 0;
    }
  }

  static orderWinners(one: ILeader, two: ILeader) {
    switch (true) {
      case (one.totalVictories > two.totalVictories):
        return -1;
      case (one.totalVictories < two.totalVictories):
        return 1;
      default:
        return 0;
    }
  }

  static orderBalance(one: ILeader, two: ILeader) {
    switch (true) {
      case (one.goalsBalance > two.goalsBalance):
        return -1;
      case (one.goalsBalance < two.goalsBalance):
        return 1;
      default:
        return 0;
    }
  }

  static orderFavor(one: ILeader, two: ILeader) {
    switch (true) {
      case (one.goalsFavor > two.goalsFavor):
        return -1;
      case (one.goalsFavor < two.goalsFavor):
        return 1;
      default:
        return 0;
    }
  }

  static orderOwn(one: ILeader, two: ILeader) {
    switch (true) {
      case (one.goalsOwn > two.goalsOwn):
        return -1;
      case (one.goalsOwn < two.goalsOwn):
        return 1;
      default:
        return 0;
    }
  }

  static totalOrder(one: ILeader, two: ILeader) {
    if (one.totalPoints !== two.totalPoints) {
      return LeaderBoardStats.orderPoints(one, two);
    }
    if (one.totalVictories !== two.totalVictories) {
      return LeaderBoardStats.orderWinners(one, two);
    }
    if (one.goalsBalance !== two.goalsBalance) {
      return LeaderBoardStats.orderBalance(one, two);
    }
    if (one.goalsFavor !== two.goalsFavor) {
      return LeaderBoardStats.orderFavor(one, two);
    }
    if (one.goalsOwn !== two.goalsOwn) {
      return LeaderBoardStats.orderOwn(one, two);
    }
    return 0;
  }

  static orderBoard(board: ILeader[]) {
    const newBoard = board
      .sort((one, two) => LeaderBoardStats.totalOrder(one, two));
    return newBoard;
  }

  static score(teams: ITeams, match: MatchM[]) {
    const teamId = LeaderBoardStats.filterMatch(teams.id, match);
    const points = LeaderBoardStats.sumPoints(teams.id, teamId);
    const goals = LeaderBoardStats.sumGoals(teams.id, teamId);
    return LeaderBoardStats.createBoard(teams, points, goals);
  }

  static scoreHome(teams: ITeams, match: MatchM[]) {
    const teamId = LeaderBoardStats.filterHome(teams.id, match);
    const points = LeaderBoardStats.sumPoints(teams.id, teamId);
    const goals = LeaderBoardStats.sumGoals(teams.id, teamId);
    return LeaderBoardStats.createBoard(teams, points, goals);
  }

  static scoreAway(teams: ITeams, match: MatchM[]) {
    const teamId = LeaderBoardStats.filterAway(teams.id, match);
    const points = LeaderBoardStats.sumPoints(teams.id, teamId);
    const goals = LeaderBoardStats.sumGoals(teams.id, teamId);
    return LeaderBoardStats.createBoard(teams, points, goals);
  }
  
  async leader(): Promise<ILeader[]> {
    const { teams, match } = await this.findData();
    const board = teams.map((team) => LeaderBoardStats.score(team, match));
    const order = LeaderBoardStats.orderBoard(board);
    return order;
  }

  async leaderHome(): Promise<ILeader[]> {
    const { teams, match } = await this.findData();
    const board = teams.map((team) => LeaderBoardStats.scoreHome(team, match));
    const order = LeaderBoardStats.orderBoard(board);
    return order;
  }

  async leaderAway(): Promise<ILeader[]> {
    const { teams, match } = await this.findData();
    const board = teams.map((team) => LeaderBoardStats.scoreAway(team, match));
    const order = LeaderBoardStats.orderBoard(board);
    return order;
  }
}
