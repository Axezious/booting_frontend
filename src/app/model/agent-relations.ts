import { Users } from './users';

export class AgentRelations {
    id: string;
    idAgent: Users;
    idClient: Users;
    startDate: Date;
    endDate: Date;
    createdBy : String;
    updatedBy : String;
}