import { BaseModel } from './base-model';

export class Products extends BaseModel {
    code: string;
    name: string;  
    description: string;
}