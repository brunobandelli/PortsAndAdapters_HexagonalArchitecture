import { Client } from '../../../domain/client';

export interface IClientRepository {
    findById(id: string): Promise<Client | null>;
    save(client: Client): Promise<void>;
}