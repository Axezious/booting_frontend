import { Users } from './users';

export class Notifications {
    id: string;
    idUsers: Users;
    notif: string;
    link: string;
    status: boolean;
    createdBy : String;
    updatedBy : String;
}