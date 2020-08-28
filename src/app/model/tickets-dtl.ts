import { Tickets } from './tickets';

export class TicketsDtl {
    id: string;
    idTickets: Tickets;
    statusBefore: string;
    statusAfter: string;
    date: Date;
    description: string;
    createdBy : String;
    updatedBy : String;
}