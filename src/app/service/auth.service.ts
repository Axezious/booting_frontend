import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts';
import { Users } from '../model/users';
import { Companies } from '../model/companies';
import { Roles } from '../model/roles';
import { type } from 'jquery';
import { PhotoProfile } from '../model/photo-profile';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: Accounts = new Accounts();

  constructor() {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.account.idUser.idPhoto = new PhotoProfile();
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token')
  }

  removeStorage() {
    localStorage.clear();
  }

  isAuthenticate(): boolean {
    return this.getToken() != null && this.getToken() != undefined;
  }

  setAccount(account: Accounts) {
    if (account.idUser.idPhoto == null || account.idUser.idPhoto == undefined) {
      account.idUser.idPhoto = new PhotoProfile();
      account.idUser.idPhoto.id = " "
      account.idUser.idPhoto.name = " "
      account.idUser.idPhoto.type = " "
      account.idUser.idPhoto.data = " "
    }
    console.log("setAccount");
    console.log(account);
    localStorage.setItem('account', JSON.stringify(account));
    // if (account.idUser.idPhoto == null || account.idUser.idPhoto == undefined) {
    //   localStorage.setItem('email', account.email);
    //   localStorage.setItem('idUser', account.idUser.id);
    //   localStorage.setItem('nip', account.idUser.nip);
    //   localStorage.setItem('name', account.idUser.name);
    //   localStorage.setItem('idCompany', account.idUser.idCompany.id);
    //   localStorage.setItem('companyName', account.idUser.idCompany.name);
    //   localStorage.setItem('idRole', account.idUser.idRole.id);
    //   localStorage.setItem('roleCode', account.idUser.idRole.code);
    //   localStorage.setItem('roleName', account.idUser.idRole.name);
    //   localStorage.setItem('contact', account.idUser.contact);
    //   localStorage.setItem('address', account.idUser.address);
    //   localStorage.setItem('idPhoto', " ")
    //   localStorage.setItem('nameFrofile', " ");
    //   localStorage.setItem('type', " ");
    //   localStorage.setItem('data', " ");
    // } else {
    //   localStorage.setItem('email', account.email);
    //   localStorage.setItem('idUser', account.idUser.id);
    //   localStorage.setItem('nip', account.idUser.nip);
    //   localStorage.setItem('name', account.idUser.name);
    //   localStorage.setItem('idCompany', account.idUser.idCompany.id);
    //   localStorage.setItem('companyName', account.idUser.idCompany.name);
    //   localStorage.setItem('idRole', account.idUser.idRole.id);
    //   localStorage.setItem('roleCode', account.idUser.idRole.code);
    //   localStorage.setItem('roleName', account.idUser.idRole.name);
    //   localStorage.setItem('contact', account.idUser.contact);
    //   localStorage.setItem('address', account.idUser.address);
    //   localStorage.setItem('idPhoto', account.idUser.idPhoto.id)
    //   localStorage.setItem('nameFrofile', account.idUser.idPhoto.name);
    //   localStorage.setItem('type', account.idUser.idPhoto.type);
    //   localStorage.setItem('data', account.idUser.idPhoto.data);
    // }

  }

  getAccount(): Accounts {
    let account = new Accounts();
    if (localStorage.getItem('account') == undefined || localStorage.getItem('account') == null) {
      account.idUser = new Users();
      account.idUser.idPhoto = new PhotoProfile();
      account.idUser.idCompany = new Companies();
      account.idUser.idRole = new Roles();
    } else {
      account = JSON.parse(localStorage.getItem('account'));
      console.log(account);
    }

    // account.idUser = new Users();
    // account.idUser.idPhoto = new PhotoProfile();
    // account.idUser.idCompany = new Companies();
    // account.idUser.idRole = new Roles();
    // account.email = localStorage.getItem('email');
    // account.idUser.id = localStorage.getItem('idUser')
    // account.idUser.nip = localStorage.getItem('nip');
    // account.idUser.name = localStorage.getItem('name');
    // account.idUser.idCompany.id = localStorage.getItem('idCompany');
    // account.idUser.idCompany.name = localStorage.getItem('companyName');
    // account.idUser.idCompany.id = localStorage.getItem('idRole');
    // account.idUser.idRole.code = localStorage.getItem('roleCode');
    // account.idUser.idRole.name = localStorage.getItem('roleName');
    // account.idUser.contact = localStorage.getItem('contact');
    // account.idUser.address = localStorage.getItem('address');
    // account.idUser.idPhoto.id = localStorage.getItem('idPhoto')
    // account.idUser.idPhoto.name = localStorage.getItem('nameFrofile');
    // account.idUser.idPhoto.type = localStorage.getItem('type');
    // account.idUser.idPhoto.data = localStorage.getItem('data');
    return account;
  }
}
