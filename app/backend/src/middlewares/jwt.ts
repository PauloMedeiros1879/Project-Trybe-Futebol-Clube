import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IJwt } from '../interfaces';

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
