import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { Accounts } from 'src/app/model/accounts';
import { Companies } from 'src/app/model/companies';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';

@Component({
  selector: 'app-insert-client-account',
  templateUrl: './insert-client-account.component.html',
  styleUrls: ['./insert-client-account.component.scss']
})
export class InsertClientAccountComponent implements OnInit {

  account: Accounts = new Accounts();
  accountTemp: Accounts = new Accounts();

  constructor(private auth: AuthService, private apiService: ApiService) {
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp.idUser.idRole = new Roles();

    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();

    this.account.createdBy = this.accountTemp.idUser.name;
    this.account.idUser.createdBy = this.accountTemp.idUser.name;
    this.account.idUser.idCompany.createdBy = this.accountTemp.idUser.name;

    this.account.idUser.idRole.code = 'CL';
    this.accountTemp = auth.getAccount();

    this.account.createdBy = this.accountTemp.idUser.name;
  }

  ngOnInit() {
  }

  submit() {
    console.log(this.account);
    this.apiService.insertAccount(this.account).subscribe(data => {
      console.log(data);
    })
    this.account = new Accounts();
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
  }

}
