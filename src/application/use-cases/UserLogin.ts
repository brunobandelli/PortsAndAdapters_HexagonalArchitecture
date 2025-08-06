import { Client } from '../../domain/client';
import CryptoProvider from '../ports/providers/CryptoProvider';
import { IClientRepository } from '../ports/repositories/IClientRepository';
// import ReversePseudoCrypto from '../../temp/ReversePseudoCrypto';

export type UserLoginInput = {
    email: string,
    password: string,
}

export default class UserLogin {
    private clientRepository: IClientRepository;
    private cryptoProvider: CryptoProvider;

    constructor(
        clientRepository: IClientRepository,
        cryptoProvider: CryptoProvider
    ){
        this.clientRepository = clientRepository;
        this.cryptoProvider = cryptoProvider;
    }

    async execute(input: Client): Promise<Client | null> {
        const user = await this.clientRepository.findByEmail(input.email!)
        if(!user) return null

        const equal = await this.cryptoProvider.compare(input.password!, user.password!)
        if(!equal) return null

        return user
    }

}