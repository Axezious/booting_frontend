import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts';
import { Users } from '../model/users';
import { Companies } from '../model/companies';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: Accounts = new Accounts();

  constructor() {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
  }

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
    this.account.idUser.name = localStorage.getItem('name');
    this.account.idUser.idCompany.code = localStorage.getItem('codeCompany');
    this.account.idUser.idCompany.name = localStorage.getItem('company');
    this.account.email = localStorage.getItem('email');
    this.account.idUser.contact = localStorage.getItem('contact');

    return this.account;
  }
}
