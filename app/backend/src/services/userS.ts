import { IUsers } from '../interfaces';
import UserModel from '../database/models/usersModel';

export default class UserS {
  constructor(
    private userModel:
    typeof UserModel,
  ) { }

  async login(userLogin: IUsers) {
    const user = await this.userModel.findOne(
      { where:
        { email:
           userLogin.email },
      },
    );
    return user;
  }
}
