import { TUser, User } from '@src/models/User';
import { error, HttpStatuses } from 'adapcon-utils-js';

type TUserParam = {
  email: string;
  name: string;
  password: string;
}

export async function CreateUser({
  email,
  name,
  password,
}: TUserParam): Promise<TUser> {
  const user = new User({
    email
  })

  await user.get();
  if (user.show().PK)
    throw error(HttpStatuses.badRequest, 'User already exists');

  await user.create({name, password});
  return user.show();
}
