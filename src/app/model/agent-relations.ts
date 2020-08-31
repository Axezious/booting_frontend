import { Users } from './users';
import { Companies } from './companies';

export class AgentRelations {
    id: string;
    idAgent: Users;
    idCompany: Companies;
    startDate: Date;
    endDate: Date;
    createdBy : String;
    updatedBy : String;
}