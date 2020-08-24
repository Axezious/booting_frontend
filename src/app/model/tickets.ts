import { Users } from './users';

export class Tickets {
    id: string;
    idCustomer: Users;
    idAgent: Users;
    idProduct: string;
    idPriority: string;
    code: string;
    idClassification: string;
    subject: string;
    idStatus: string;
}