import { Client } from '../../domain/client';
import { Telephone, TypeTelephone } from '../../domain/telephone';
import { IClientRepository } from '../ports/repositories/IClientRepository';

interface InsertTelephoneToClientDTO {
    clientId: string;
    telephoneId: string;
    type: TypeTelephone;
    number: string;
}

export class InsertTelephoneToClient {
    private clientRepository: IClientRepository;

    constructor(clientRepository: IClientRepository){
        this.clientRepository = clientRepository;
    }

    async execute(dto: InsertTelephoneToClientDTO): Promise<Client> {
        const {clientId, telephoneId, type, number} = dto;
        const client = await this.clientRepository.findById(Number(clientId));

        console.log('-----dto: ', dto)
        console.log('-----client: ', client)
        if(!client){
            throw new Error('Cliente não encontrado');
        }
        console.log('-----clientbefore: ', client)

        const telephone = new Telephone(telephoneId, type, number);
        client.insertTelephone(telephone);

        await this.clientRepository.save(client)

        return client
    }
}