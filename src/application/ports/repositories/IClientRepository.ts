import { Client, User } from '../../../domain/client';

export interface IClientRepository {
    findByEmail(email: string): Promise<Client | null>
    findById(id: number): Promise<Client | null>;
    save(client: User): Promise<void>;
}