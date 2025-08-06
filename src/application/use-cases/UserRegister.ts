import { User } from '../../domain/client';
import CryptoProvider from '../ports/providers/CryptoProvider';
import { IClientRepository } from '../ports/repositories/IClientRepository';

export default class UserRegister {
    private clientRepository: IClientRepository;
    private cryptoProvider: CryptoProvider;

    constructor(
        clientRepository: IClientRepository,
        cryptoProvider: CryptoProvider,
    ){
        this.clientRepository = clientRepository;
        this.cryptoProvider = cryptoProvider;
    }

        async execute(user: User): Promise<void> {

        console.log('------USER: ', user)
        const passwordPseudoCrypto = await this.cryptoProvider.encrypt(user.password!)
        console.log('------passwordPseudoCrypto: ', passwordPseudoCrypto)

        const cryptoUser = {...user, password: passwordPseudoCrypto }

        console.log('------cryptoUser: ', cryptoUser)


        await this.clientRepository.save(cryptoUser)
    }
    
}