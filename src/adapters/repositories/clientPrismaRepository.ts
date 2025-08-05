import { IClientRepository } from '../../application/ports/repositories/clientRepository';
import { Client } from '../../domain/client';
import { Telephone } from '../../domain/telephone';
import prisma from '../../infrastructure/db/database';

export class ClientPrismaRepository implements IClientRepository {

  async findById(id: string): Promise<Client | null> {
    const clientData = await prisma.client.findUnique({
      where: { id },
      include: { telephone: true },
    });

    if (!clientData) return null;

    const client = new Client(clientData.id, clientData.name, []);

    if (clientData.telephone) {
      clientData.telephone.forEach((tel) => {
        client.insertTelephone(
          new Telephone(tel.id, tel.type, tel.number)
        );
      });
    }

    return client;
  }

  async save(client: Client): Promise<void> {
    await prisma.client.upsert({
      where: { id: client.id },
      update: { name: client.name },
      create: { id: client.id, name: client.name },
    });

    const existingPhones = await prisma.telephone.findMany({
      where: { clientId: client.id },
    });

    for (const tel of client.telephone) {
      const existingPhone = existingPhones.find(p => p.id === tel.id);

      if (existingPhone) {
        await prisma.telephone.update({
          where: { id: tel.id },
          data: {
            type: tel.type,
            number: tel.number,
          }
        });
      } else {
        await prisma.telephone.create({
          data: {
            id: tel.id,
            type: tel.type,
            number: tel.number,
            clientId: client.id,
          }
        });
      }
    }
  }
}
