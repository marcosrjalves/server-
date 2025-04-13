import { TUser, User } from '@src/models/User';
import { error, HttpStatuses } from 'adapcon-utils-js';
import { Session } from '@src/models/Session';

type TLogin = {
  email: string;
  password: string;
}

export async function Login({
  email,
  password,
}: TLogin): Promise<TUser & { token: string }> {
  const user = new User({
    email,
  })
  await user.get()

  const validate = await user.validatePassword(password);
  if(!validate) {
    throw error(HttpStatuses.unauthorized, 'Invalid password');
  }
  const { name } = user.show();

  const session = new Session({
    name: name,
    email,
  })

  await session.create()
  const sessionData = session.show();

  return {
    ...sessionData
  }
}
