import { TicketsDtl } from './tickets-dtl';

export class Attachment {
    id: string;
    idDetail: TicketsDtl;
    attach: File;
    extension: string;
}