import { IClientRepository } from '../../application/ports/repositories/IClientRepository';
import { Client } from '../../domain/client';
import { Telephone } from '../../domain/telephone';
import prisma from '../../infrastructure/db/database';

export class ClientPrismaRepository implements IClientRepository {

  async findByEmail(email: string): Promise<Client | null> {
    const clientData = await prisma.client.findUnique({
      where: { email },
      include: { telephone: true },
    });

    if (!clientData) return null;

    const client = new Client(clientData.id, clientData.name, [], clientData.email ?? '', clientData.password ?? '');

    clientData.telephone.forEach((tel) => {
      client.insertTelephone(
        new Telephone(tel.id, tel.type, tel.number)
      );
    });

    return client;
  }

  async findById(id: number): Promise<Client | null> {
    const clientData = await prisma.client.findUnique({
      where: { id },
      include: { telephone: true },
    });

    if (!clientData) return null;

    const client = new Client(clientData.id, clientData.name, [], clientData.email ?? '', clientData.password ?? '');

    clientData.telephone.forEach((tel) => {
      client.insertTelephone(
        new Telephone(tel.id, tel.type, tel.number)
      );
    });

    return client;
  }

  async save(client: Client): Promise<void> {
    let savedClientId = client.id;

    // Verifica se o cliente já existe por id ou email
    const existingClient = await prisma.client.findFirst({
      where: {
        OR: [
          client.id ? { id: client.id } : undefined,
          client.email ? { email: client.email } : undefined,
        ].filter(Boolean) as any
      }
    });

    if (existingClient) {
      // Atualiza cliente existente
      await prisma.client.update({
        where: { id: existingClient.id },
        data: {
          name: client.name,
          email: client.email,
          password: client.password,
        }
      });

      savedClientId = existingClient.id;
    } else {
      // Cria novo cliente (sem passar o ID manualmente)
      const newClient = await prisma.client.create({
        data: {
          id: client.id,
          name: client.name,
          email: client.email,
          password: client.password,
        }
      });
      console.log('-------NEWCLIENT: ', newClient)

      savedClientId = newClient.id;
    }

    // Telefones
    const existingPhones = await prisma.telephone.findMany({
      where: { clientId: savedClientId },
    });

    for (const tel of client.telephone ?? []) {
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
            clientId: savedClientId,
          }
        });
      }
    }
  }
}
