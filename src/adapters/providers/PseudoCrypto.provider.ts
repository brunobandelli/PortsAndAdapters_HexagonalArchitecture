import CryptoProvider from '../../application/ports/providers/CryptoProvider'

export default class PseudoCrypto implements CryptoProvider {
    async encrypt(password: string): Promise<string> {
        return password.split('').reverse().join('')
    }
    async compare(password: string, cryptoPassword: string): Promise<boolean> {
        return password === cryptoPassword.split('').reverse().join('')
    }
    
}