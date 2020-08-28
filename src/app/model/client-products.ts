import { Companies } from './companies';
import { Products } from './products';

export class ClientProducts {
    id: string;
    idCompany: Companies;
    idProduct: Products;
    ticketUrgent: number;
    ticketMedium: number;
    createdBy : String;
    updatedBy : String;
}