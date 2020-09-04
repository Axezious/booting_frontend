import { Tickets } from './tickets';
import { BaseModel } from './base-model';

export class TicketsDtl extends BaseModel {
    sender: string;
    idTickets: Tickets;
    date: Date;
    description: string;
}