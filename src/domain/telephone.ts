export type TypeTelephone = 'residencial' | 'comercial' | 'celular'

export interface ITelephone {
    id: string,
    type: TypeTelephone,
    number: string,
}

export class Telephone implements ITelephone {
    id: string;
    type: TypeTelephone;
    number: string;

    constructor (id: string, type: TypeTelephone, number: string){
        this.id = id,
        this.type = type,
        this.number = number
    }
}