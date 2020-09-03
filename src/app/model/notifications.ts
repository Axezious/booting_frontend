import { Users } from './users';
import { BaseModel } from './base-model';

export class Notifications extends BaseModel {
    idUsers: Users;
    notif: string;
    link: string;
    status: boolean;
}