import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IJwt, ILoad } from '../interfaces';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default function tokenJWT(id: number, username: string, role: string): IJwt {
  const token = jwt
    .sign({
      data:
      {
        id,
        username,
        role,
      },
    }, secret, { algorithm: 'HS256' });

  return { token };
}

export function recover(token: string): ILoad {
  try {
    const infos = jwt.verify(token, secret);
    return infos as ILoad;
  } catch (err) {
    throw new Error('invalidToken');
  }
}
