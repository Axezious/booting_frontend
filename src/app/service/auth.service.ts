import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeToken(key: string) {
    localStorage.removeItem(key);
  }

  isAuthenticate(): boolean {
    return this.getToken() !=null && this.getToken() != undefined;
  }

  setAccount(account: Accounts) {
    localStorage.setItem('name', account.idUser.name);
    localStorage.setItem('codeCompany', account.idUser.idCompany.code);
    localStorage.setItem('company', account.idUser.idCompany.name);
    localStorage.setItem('email', account.email);
    localStorage.setItem('contact', account.idUser.contact);
  }

  getAccount(): Accounts {
    let account: Accounts = new Accounts();
    localStorage.getItem('name');
    localStorage.getItem('codeCompany');
    localStorage.getItem('company');
    localStorage.getItem('email');
    localStorage.getItem('contact');

    return account;
  }
}
