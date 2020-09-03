import { Companies } from './companies';
import { Products } from './products';
import { BaseModel } from './base-model';

export class ClientProducts extends BaseModel{
    idCompany: Companies;
    idProduct: Products;
    ticketUrgent: number;
    ticketMedium: number;
}