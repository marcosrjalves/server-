import { userPutDao, userGetDao, TDBUser } from "@src/database/User";
import { randomBytes, scryptSync } from "crypto";

export type TUser = {
  PK?: string;
  email: string;
  name?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class User {
  private PK: string;
  private readonly email: string;
  private name: string;
  private password: string;
  private createdAt: string;
  private updatedAt: string;

  constructor({
    email,
  }: TUser) {
    this.email = email;
  }

  async get(): Promise<void> {
    const user = await userGetDao(`USER#${this.email}`);
    if (user) {
      this.populateFromDB(user);
    }
  }

  async create({
    name,
    password,
  } : {
    name: string;
    password: string;
  }): Promise<void> {
    this.generatePassword(password);
    this.populateKey();

    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
    this.name = name;

    await userPutDao(this as unknown as TDBUser);
  }

  generatePassword(password): void {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');
    this.password = hashedPassword + salt;
  }

  async validatePassword(password: string): Promise<boolean> {
    const salt = this.password.slice(-32);
    const originalPassHash = this.password.slice(0, -32);
    const currentPassHash = scryptSync(password, salt, 64).toString('hex');
    return originalPassHash === currentPassHash;
  }

  show(): TUser & { PK: string, createdAt: string, updatedAt: string, name: string } {
    return {
      email: this.email,
      name: this.name,
      PK: this.PK,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  populateFromDB(user: TDBUser): void {
    this.PK = user.PK;
    this.name = user.name;
    this.password = user.password;
    this.password = user.password;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }


  populateKey() {
    this.PK = `USER#${this.email}`;
  }
}
