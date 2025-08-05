import { Telephone } from './telephone';

export interface IClient{
    id: string,
    name: string,
    telephone?: Telephone[],
    insertTelephone(telephone: Telephone): void,
    removeTelephone(telephone: string): void,
}

export class Client implements IClient{
    id: string;
    name: string;
    telephone: Telephone[];

    constructor(id: string, name: string, telephone?: Telephone[] ){
        this.id =  id,
        this.name = name,
        this.telephone = telephone!
    }

    insertTelephone(telephone: Telephone ): void {
        this.telephone.push(telephone)
    }

    removeTelephone(telephoneId: string): void {
        this.telephone = this.telephone.filter(telephone => telephone.id !== telephoneId)
    }
}