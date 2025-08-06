import { Telephone } from './telephone';

export interface IClient {
  id?: number;
  name: string;
  telephone?: Telephone[];
  email?: string;
  password?: string;
  insertTelephone?(telephone: Telephone): void;
  removeTelephone?(telephone: string): void;
}

export class Client implements IClient {
  id: number;
  name: string;
  telephone: Telephone[];
  email?: string;
  password?: string;

  constructor(id: number, name: string, telephone?: Telephone[], email?: string, password?: string) {
    this.id = id;
    this.name = name;
    this.telephone = telephone ?? [];
    this.email = email;
    this.password = password;
  }

  insertTelephone(telephone: Telephone): void {
    this.telephone.push(telephone);
  }

  removeTelephone(telephoneId: string): void {
    this.telephone = this.telephone.filter(t => t.id !== telephoneId);
  }
}

export class User implements IClient {
  name: string;
  id?: number;
  email?: string;
  password?: string;

  constructor(
    name: string,
    id?: number,
    email?: string,
    password?: string
  ) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.password = password;
  }
}
