import { Op } from 'sequelize';
import Team from '../database/models/teamsM';

export default async function check(team: number[]) {
  const teamsCheck = await Team.findAll({
    where: { [Op.or]: [{ id: team }] },
  });
  return teamsCheck.length === 2;
}
