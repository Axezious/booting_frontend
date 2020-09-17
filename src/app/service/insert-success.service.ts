import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InsertSuccessService {

  constructor() { }

  private insertSuccess = new Subject<any>();
    toast = this.insertSuccess.asObservable();

  callInsertToast(){
    this.insertSuccess.next();
  }
}