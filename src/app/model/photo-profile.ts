import { BaseModel } from './base-model';
import { Users } from './users';

export class Profile extends BaseModel {
    user: Users;
    name: string;
    type: string;
    data: File;
}