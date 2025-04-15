import { genericDaoPut, genericDaoGet } from "./GenericDao";
const TABLE_NAME = process.env.DDB_TABLE_USER as string;

export type TDBUser = {
  PK: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export async function userPutDao(user: TDBUser) {
	await genericDaoPut(TABLE_NAME, user);
	return user;
}

export async function userGetDao(PK: string): Promise<TDBUser | undefined> {
  const { Item: user } = await genericDaoGet(TABLE_NAME, { PK });
  return user as unknown as TDBUser;
}
