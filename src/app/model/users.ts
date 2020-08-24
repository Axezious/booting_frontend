import { Companies } from './companies';
import { Roles } from './roles';

export class Users {
    id: string;
    nip: string;
    name: string;
    idCompany: Companies;
    idRole: Roles;
    contact: string;
    address: string;
}