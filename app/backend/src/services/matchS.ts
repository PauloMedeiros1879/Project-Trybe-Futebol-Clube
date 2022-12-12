import TeamM from '../database/models/teamsM';
import MatchM from '../database/models/matchesM';
import check from '../middlewares/check';

export default class MatchS {
  constructor(private matchModel: typeof MatchM) {}

  async match(): Promise<MatchM[]> {
    const matches = await this.matchModel.findAll({
      include: [
        {
          model: TeamM,
          as: 'teamHome',
          attributes:
          { exclude: ['id'] },
        },
        {
          model: TeamM,
          as: 'teamAway',
          attributes:
          { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  async matchFilter(inProgress: boolean): Promise<MatchM[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        {
          model: TeamM,
          as: 'teamHome',
          attributes:
            { exclude: ['id'] },
        },
        {
          model: TeamM,
          as: 'teamAway',
          attributes:
            { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }

  async matchCreate(match: MatchM): Promise<MatchM> {
    const existTeam = await check([match.homeTeam, match.awayTeam]);
    if (!existTeam) throw new Error('notExistTeam');
    const newMatch = { ...match, inProgress: true };
    const matchUp = await this.matchModel.create(newMatch);
    return matchUp;
  }

  async matchUpdate(id: number): Promise<object> {
    return this.matchModel.update({
      inProgress: false }, {
      where: { id },
    })
      .then(() => ({ message: 'Finished' }));
  }

  async matchGoalsUpdate(id: number, home: number, away: number): Promise<object> {
    return this.matchModel.update({
      homeTeamGoals: home,
      awayTeamGoals: away }, {
      where: { id },
    })
      .then(() => ({ message: 'Goals count changed successfully!' }));
  }
}
