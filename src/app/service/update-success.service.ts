import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateSuccessService {

   constructor() { }

  private updateSuccess = new Subject<any>();
    toast = this.updateSuccess.asObservable();

  callUpdateToast(){
    this.updateSuccess.next();
  }
}
