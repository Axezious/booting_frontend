import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private insertSuccess = new Subject<any>();
  toastInsertSuccess = this.insertSuccess.asObservable();

  private updateSuccess = new Subject<any>();
  toastUpdateSuccess = this.updateSuccess.asObservable();

  private deleteSuccess = new Subject<any>();
  toastDeleteSuccess = this.deleteSuccess.asObservable();

  private forgotPassSuccess = new Subject<any>();
  toastForgotPassSuccess = this.forgotPassSuccess.asObservable();

  private changePassSuccess = new Subject<any>();
  toastChangePassSuccess = this.changePassSuccess.asObservable();

  private insertFail = new Subject<any>();
  toastInsertFail = this.insertFail.asObservable();

  private updateFail = new Subject<any>();
  toastUpdateFail = this.updateFail.asObservable();

  private deleteFail = new Subject<any>();
  toastDeleteFail = this.deleteFail.asObservable();

  private forgotPassFail = new Subject<any>();
  toastForgotPassFail = this.forgotPassFail.asObservable();

  private changePassFail = new Subject<any>();
  toastChangePassFail = this.changePassFail.asObservable();
  
  callInsertToastSuccess(messsage: string) {
    this.insertSuccess.next(messsage);
  }

  callUpdateToastSuccess(message: string) {
    this.updateSuccess.next(message);
  }

  callDeleteToastSuccess(message: string) {
    this.deleteSuccess.next(message);
  }

  callForgotPassSuccess(message: string) {
    this.forgotPassSuccess.next(message);
  }

  callChangePassSuccess(message: string) {
    this.changePassSuccess.next(message);
  }  

  callInsertToastFail(messsage: string) {
    this.insertFail.next(messsage);
  }

  callUpdateToastFail(messsage: string) {
    this.updateFail.next(messsage);
  }

  callDeleteToastFail(messsage: string) {
    this.deleteFail.next(messsage);
  }

  callForgotPassFail(message: string) {
    this.forgotPassFail.next(message);
  }

  callChangePassFail(message: string) {
    this.changePassFail.next(message);
  }
}