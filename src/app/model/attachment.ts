import { TicketsDtl } from './tickets-dtl';

export class Attachment {
    id: string;
    idTicketDtl: TicketsDtl;
    attach: File;
    extension: string;
    createdBy : String;
    updatedBy : String;
}