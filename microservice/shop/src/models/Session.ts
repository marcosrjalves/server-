import { JWTSecret } from '@src/utils/secrets';
import jwt from 'jsonwebtoken';

export type TSession = {
  token?: string;
  email: string;
  name: string;
}

export class Session {
  private token: string;
  private readonly email: string;
  private readonly name: string;

  constructor({
    email,
    name,
  }: TSession) {
    this.email = email;
    this.name = name;
  }

  async create(): Promise<void> {
    const secret = await JWTSecret();
    const { email, name } = this;

    const token = jwt.sign({ email, name }, secret as string, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });

    this.token = token;
  }

  show(): TSession & { token: string } {
    return {
      token: this.token,
      email: this.email,
      name: this.name,
    }
  }

}
