import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';
import { Companies } from 'src/app/model/companies';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-insert-customer',
  templateUrl: './insert-customer.component.html',
  styleUrls: ['./insert-customer.component.scss']
})
export class InsertCustomerComponent implements OnInit {

  account: Accounts = new Accounts();
  accountTemp: Accounts = new Accounts();
  cPass: String;

  constructor(private auth: AuthService) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.accountTemp = auth.getAccount();
    this.account.idUser.idCompany = this.accountTemp.idUser.idCompany;
    this.account.idUser.idRole = this.accountTemp.idUser.idRole;
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.account);
    console.log(this.cPass);
    
    this.account = new Accounts();
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.cPass = '';
  }

}
