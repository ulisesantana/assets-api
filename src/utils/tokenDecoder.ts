import { Context } from 'koa';
import * as jsonwebtoken from 'jsonwebtoken';

export default function tokenDecoder(ctx: Context) {
  const { data } = jsonwebtoken.verify(
    ctx.header.authorization.split(' ')[1],
    process.env.TOKEN_SECRET || 'secret'
  );
  return data;
}