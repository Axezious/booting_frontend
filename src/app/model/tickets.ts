import { Users } from './users';
import { Products } from './products';
import { Priorities } from './priorities';
import { Status } from './status';
import { Classifications } from './classifications';
import { BaseModel } from './base-model';

export class Tickets extends BaseModel {
    idCustomer: Users;
    idProduct: Products;
    idPriority: Priorities;
    code: string;
    idClassification: Classifications;
    subject: string;
    idStatus: Status;
}