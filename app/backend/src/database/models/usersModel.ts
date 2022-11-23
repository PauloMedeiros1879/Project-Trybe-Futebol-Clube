import { DataTypes, Model } from 'sequelize';
import db from '.';

export default class User extends Model {
  public email: string | undefined;
  public password: string | undefined;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);
