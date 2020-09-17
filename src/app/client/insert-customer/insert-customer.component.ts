import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';
import { Companies } from 'src/app/model/companies';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import { InsertSuccessService } from 'src/app/service/insert-success.service';

@Component({
  selector: 'app-insert-customer',
  templateUrl: './insert-customer.component.html',
  styleUrls: ['./insert-customer.component.scss'],
  providers:[MessageService]
})
export class InsertCustomerComponent implements OnInit {

  account: Accounts = new Accounts();
  accountTemp: Accounts = new Accounts();
  cPass: String;

  constructor(private auth: AuthService, private apiService: ApiService,
              private messageService:MessageService, private insertToast:InsertSuccessService,
              private router:Router) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.accountTemp = auth.getAccount();
    this.account.idUser.idCompany = this.accountTemp.idUser.idCompany;
    this.account.idUser.idRole.code = 'CTM';
  }

  ngOnInit() {
  }

  submit() {

    this.account.createdBy = this.accountTemp.idUser.name;
    this.account.idUser.createdBy = this.accountTemp.idUser.name;
    console.log(this.account);
    console.log(this.cPass);



    this.apiService.insertAccount(this.account).subscribe( data => {
      console.log(data);
      this.insertToast.callInsertToast();
      this.router.navigateByUrl('client/view-customer');
		}, err => {
			this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Insert Data Failed' });
		});
    
    this.account = new Accounts();
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.cPass = '';
  }

}
