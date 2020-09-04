import { BaseModel } from './base-model';

export class TemplateEmail extends BaseModel {
    code: string;
    name: string;
    template: string;
}