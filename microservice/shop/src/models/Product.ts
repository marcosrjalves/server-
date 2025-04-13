import {
  productGetDao,
  productPutDao,
  updateProductDao,
  deleteProductDao,
  queryProductDao,
  TDBProduct
} from '@src/database/Product';
import { error, HttpStatuses } from 'adapcon-utils-js';
import { randomUUID } from 'node:crypto';

export type TProduct = {
  PK: string;
  SK: string;
  createdBy?: string;
  lastModifiedBy?: string;
  name: string;
  description: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}

export class Product {
  private PK: string;
  private SK: string;
  private createdBy: string;
  private lastModifiedBy: string;
  private name: string;
  private description: string;
  private price: number;
  private createdAt: string;
  private updatedAt: string;

  constructor() {
    this.PK = '';
    this.SK = '';
    this.createdBy = '';
    this.lastModifiedBy = '';
    this.name = '';
    this.description = '';
    this.price = 0;
    this.createdAt = '';
    this.updatedAt = '';
  }

  blankProduct({
    name,
    description,
    price,
  }: {
    name: string;
    description: string;
    price: number;
  }): TProduct & {
    PK?: string;
    SK?: string;
  } {
    this.name = name;
    this.description = description;
    this.price = price;

    return this as unknown as TProduct
  }

  fromDB({
    PK,
    SK,
  }: {
    PK: string;
    SK: string;
  }): TProduct & {
    name?: string;
    description?: string;
    price?: number;
  } {
    this.PK = PK;
    this.SK = SK;
    return this as unknown as TProduct;
  }

  async create(email): Promise<void> {
    this.populateKeys();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.createdBy = email;
    await productPutDao(this as unknown as TDBProduct);
  }

  async get(): Promise<void> {
    const product = await productGetDao(this as unknown as TDBProduct);
    if (!product) {
      throw error(HttpStatuses.notFound, 'Product not found');
    }
    this.populateFromDb(product);
  }

  async update({
    name,
    description,
    price,
    email,
  }: {
    name?: string;
    description?: string;
    price?: number;
    email: string;
  }): Promise<void> {
    this.lastModifiedBy = email;
    this.updatedAt = new Date().toISOString();
    this.name = name || this.name;
    this.description = description || this.description;
    this.price = price || this.price;

    const product = await updateProductDao(this as unknown as TDBProduct);
    this.populateFromDb(product);
  }

  async delete(): Promise<void> {
    await deleteProductDao(this as unknown as TDBProduct);
  }

  static async query({
    name,
    description,
    price,
  }: {
    name?: string;
    description?: string;
    price?: number;
  }): Promise<TProduct[]> {
    const products = await queryProductDao(this as unknown as TDBProduct);

    const productsFiltered = products.filter((product) => {
      if (name || description || price) {
        const productName = name?.toLocaleLowerCase();
        const productDescription = description?.toLocaleLowerCase();
        return product.name.toLocaleLowerCase().includes(productName as string)
        || product.description.toLocaleLowerCase().includes(productDescription as string)
        || product.price === price;
      }
      return true;
    });
    return productsFiltered as unknown as TProduct[];
  }

  show(): TProduct {
    return {
      PK: this.PK,
      SK: this.SK,
      createdBy: this.createdBy,
      lastModifiedBy: this.lastModifiedBy,
      name: this.name,
      description: this.description,
      price: this.price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  populateKeys(): void {
    this.PK = `PRODUCT`;
    this.SK = `${randomUUID()}`;
  }

  populateFromDb(product) {
    this.PK = product.PK;
    this.SK = product.SK;
    this.createdBy = product.createdBy;
    this.lastModifiedBy = product.lastModifiedBy;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}
