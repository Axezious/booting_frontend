import {Users} from '../model/users'
import { BaseModel } from './base-model';

export class Accounts extends BaseModel {

    email: string;
    pass: string;
    idUser: Users;
}