import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';
import { Companies } from 'src/app/model/companies';

@Component({
  selector: 'app-insert-customer',
  templateUrl: './insert-customer.component.html',
  styleUrls: ['./insert-customer.component.scss']
})
export class InsertCustomerComponent implements OnInit {

  account: Accounts = new Accounts();
  cPassword: String;

  constructor() {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.account);
    console.log(this.cPassword);
    
    this.account = new Accounts();
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    // this.cPassword = '';
  }

}
