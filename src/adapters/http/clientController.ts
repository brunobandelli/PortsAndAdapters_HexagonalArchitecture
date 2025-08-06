import express from 'express';
import { User } from '../../domain/client';
import UserRegister from '../../application/use-cases/UserRegister';
import RealCrypto from '../providers/RealCrypto.provider';
import { ClientPrismaRepository } from '../repositories/clientPrismaRepository';
import { InsertTelephoneToClient } from '../../application/use-cases/InsertTelephoneToClient';
import { RemoveTelephoneByClient } from '../../application/use-cases/RemoveTelephoneByClient';

const router = express.Router()
const clientRepository = new ClientPrismaRepository()
const cryptoProvider = new RealCrypto()

// const fakeClient = new Client(1,  'Bruno', []);
// clientRepository.save(fakeClient); // já coloca o client no "banco de dados" em memória

router.post('/clients', async (req, res) => {
    try{
        const { name, email, password, id } : User = req.body;

        console.log("-----HTTP: ", { name, email, password, id })


        const userRegister = new UserRegister(clientRepository, cryptoProvider);
        
        if(!email){
            throw Error
        }
        if(!password){
            throw Error
        }
        const client = await userRegister.execute({
            name, email, password, id
        });

        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});
router.post('/clients/:clientId/telephones', async (req, res) => {
    try{
        const { clientId } = req.params;
        const { telephoneId, type, number } = req.body;

        console.log( { telephoneId, type, number })

        const insertTelephoneToClient = new InsertTelephoneToClient(clientRepository);
        const client = await insertTelephoneToClient.execute({clientId, telephoneId, type, number});

        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
});

router.delete('/clients/:clientId/telephones/:telephoneId', async (req, res) => {
    try {
        const { clientId, telephoneId } = req.params;

        const removeTelephoneByClient = new RemoveTelephoneByClient(clientRepository);
        const client = await removeTelephoneByClient.execute({clientId, telephoneId});

        res.status(200).json(client);
    }catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
})

router.get('/', (req, res) => {
  res.send('Server is up!');
});


export default router