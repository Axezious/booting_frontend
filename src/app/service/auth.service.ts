import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts';
import { Users } from '../model/users';
import { Companies } from '../model/companies';

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
    account.idUser = new Users();
    account.idUser.idCompany = new Companies();

    account.idUser.name = localStorage.getItem('name');
    account.idUser.idCompany.code = localStorage.getItem('codeCompany');
    account.idUser.idCompany.name = localStorage.getItem('company');
    account.email = localStorage.getItem('email');
    account.idUser.contact = localStorage.getItem('contact');

    return account;
  }
}
