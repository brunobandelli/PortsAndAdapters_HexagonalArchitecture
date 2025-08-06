import { IClientRepository } from '../../application/ports/repositories/IClientRepository';
import { Client } from '../../domain/client';

export class ClientInMemoryRepository implements IClientRepository {
    private clients: Map<string, Client> = new Map();

    async findByEmail(email: string): Promise<Client | null> {
        return this.clients.get(email) || null;
    }

    async findById(id: number): Promise<Client | null> {
        return this.clients.get(String(id)) || null
    }

    async save(client: Client): Promise<void> {
        this.clients.set(String(client.id), client)
    }
}