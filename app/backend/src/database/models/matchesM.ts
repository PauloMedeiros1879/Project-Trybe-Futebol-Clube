import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './teamsM';
import ITeams from '../../interfaces/ITeams';

export default class Matchs extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
  declare teamHome?: ITeams;
  declare teamAway?: ITeams;
}

Matchs.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    homeTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    inProgress: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Matchs.belongsTo(
  Team,
  {
    foreignKey: 'homeTeam',
    as: 'teamHome',
  },
);

Matchs.belongsTo(
  Team,
  {
    foreignKey: 'awayTeam',
    as: 'teamAway',
  },
);
