import { table } from "console";
import { genericDaoPut, genericDaoGet, genericDaoUpdate, genericDaoDelete, genericDaoQuery } from "./GenericDao";
const TABLE_NAME = process.env.DDB_TABLE_SHOP as string;

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

export async function productGetDao(product: TDBProduct): Promise<TDBProduct | undefined> {
  const { PK, SK } = product;
  const { Item: dbProduct } = await genericDaoGet(TABLE_NAME, { PK, SK });
  return dbProduct as unknown as TDBProduct;
}

export async function updateProductDao(product: TDBProduct) {
  const { PK, SK, ...rest } = product;
  const { Attributes: updatedProduct } = await genericDaoUpdate(TABLE_NAME, {
    PK,
    SK,
  }, {
    ...rest
  });
  return updatedProduct as unknown as TDBProduct;
}

export async function deleteProductDao(product: TDBProduct): Promise<TDBProduct | undefined> {
  const { PK, SK } = product;
  const { Attributes: deletedProduct } = await genericDaoDelete(TABLE_NAME, {
    PK,
    SK,
  });
  return deletedProduct as unknown as TDBProduct;
}

export async function queryProductDao(product: TDBProduct): Promise<TDBProduct[]> {
  const config = {
    table: TABLE_NAME,
    keyConditionExpression: 'PK = :pk',
    expressionAttributeValues: {
      ':pk': 'PRODUCT',
    }
  }
  const { Items: products } = await genericDaoQuery(config);
  return products as unknown as TDBProduct[];
}
