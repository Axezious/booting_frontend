import { Users } from './users';
import { Products } from './products';
import { Priorities } from './priorities';
import { Status } from './status';
import { Classifications } from './classifications';

export class Tickets {
    id: string;
    idCustomer: Users;
    idAgent: Users;
    idProduct: Products;
    idPriority: Priorities;
    code: string;
    idClassification: Classifications;
    subject: string;
    idStatus: Status;
}