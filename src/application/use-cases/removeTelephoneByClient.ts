import { Client } from '../../domain/client';
import { IClientRepository } from '../ports/repositories/IClientRepository';

interface RemoveTelephoneByClientDTO {
    clientId: string,
    telephoneId: string,
}

export class RemoveTelephoneByClient {
    private clientRepository: IClientRepository;

    constructor(clientRepository: IClientRepository){
        this.clientRepository = clientRepository;
    }

    async execute(dto: RemoveTelephoneByClientDTO): Promise<Client> {
        const { clientId, telephoneId } = dto;
        const client = await this.clientRepository.findById(Number(clientId));

        if(!client){
            throw new Error('Cliente não encontrado');
        }

        client.removeTelephone(telephoneId);

        await this.clientRepository.save(client);

        return client
    }
}