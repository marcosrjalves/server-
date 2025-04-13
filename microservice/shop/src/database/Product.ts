import { genericDaoPut, genericDaoGet } from "./GenericDao";
const TABLE_NAME = 'Shop'

export type TDBProduct = {
  PK: string;
  SK: string;
  createdBy: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

export async function productPutDao(product: TDBProduct) {
	await genericDaoPut(TABLE_NAME, product);
	return product;
}

export async function productGetDao({PK, SK}: {
  PK: string;
  SK: string;
}): Promise<TDBProduct | undefined> {
  const { Item: product } = await genericDaoGet(TABLE_NAME, { PK, SK });
  return product as unknown as TDBProduct;
}
