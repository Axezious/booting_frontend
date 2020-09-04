import { Users } from '../model/users';
import { AuthService } from '../service/auth.service';

export class Thread {
    id: string;
    contents: string;
    urlFiles: string[]; 
    dateAndTime: string;
    user: Users;
    something: string;
}