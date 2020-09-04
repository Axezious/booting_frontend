import { Users } from './users';
import { Companies } from './companies';
import { BaseModel } from './base-model';

export class AgentRelations extends BaseModel {
    idAgent: Users;
    idCompany: Companies;
    startDate: Date;
    endDate: Date;
}