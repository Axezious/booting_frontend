import { TicketsDtl } from './tickets-dtl';
import { BaseModel } from './base-model';

export class Attachment extends BaseModel {
    idTicketDtl: TicketsDtl;
    attach: File;
    extension: string;
}