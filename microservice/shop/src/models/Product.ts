import { productPutDao, TDBProduct } from '@src/database/Product';
import { randomUUID } from 'node:crypto';

export type TProduct = {
  PK?: string;
  SK?: string;
  createdBy?: string;
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
  private readonly name: string;
  private readonly description: string;
  private readonly price: number;
  private createdAt: string;
  private updatedAt: string;


  constructor({
    name,
    description,
    price,
  }: TProduct) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  async create(email): Promise<void> {
    this.populateKeys();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.createdBy = email;
    await productPutDao(this as unknown as TDBProduct);
  }

  show() {
    return {
      PK: this.PK,
      SK: this.SK,
      createdBy: this.createdBy,
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

}
