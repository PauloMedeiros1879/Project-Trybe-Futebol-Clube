import { IUserLogin, IJwt } from '../interfaces';
import UserModel from '../database/models/userM';
import tokenJWT from '../middlewares/jwt';

export default class UserS {
  constructor(
    private userModel:
    typeof UserModel,
  ) { }

  async login(userLogin: IUserLogin): Promise<IJwt> {
    const user = await this.userModel.findOne(
      { where:
        { email:
           userLogin.email },
      },
    );

    if (!user) throw new Error('invalidAcess');
    const token = tokenJWT(
      user.id,
      user.username,
      user.role,
    );

    return token;
  }
}
