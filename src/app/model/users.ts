import { Companies } from './companies';
import { Roles } from './roles';
import { BaseModel } from './base-model';
import { PhotoProfile } from './photo-profile';


export class Users extends BaseModel {
    nip: string;
    name: string;
    idCompany: Companies;
    idRole: Roles;
    contact: string;
    address: string;
    idPhoto:PhotoProfile;
}