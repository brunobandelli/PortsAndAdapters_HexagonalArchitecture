import { IClientRepository } from '../../application/ports/repositories/clientRepository';
import { Client } from '../../domain/client';

export class ClientInMemoryRepository implements IClientRepository {
    private clients: Map<string, Client> = new Map();

    async findById(id: string): Promise<Client | null> {
        return this.clients.get(id) || null
    }

    async save(client: Client): Promise<void> {
        this.clients.set(client.id, client)
    }
}