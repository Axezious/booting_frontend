import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Accounts } from 'src/app/model/accounts';
import { Companies } from 'src/app/model/companies';
import { Roles } from 'src/app/model/roles';
import { Users } from 'src/app/model/users';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-insert-agent',
  templateUrl: './insert-agent.component.html',
  styleUrls: ['./insert-agent.component.scss'],
  providers:[MessageService]
})
export class InsertAgentComponent implements OnInit {

  agent: Accounts = new Accounts();
  accountTemp: Accounts = new Accounts();

  constructor(private apiService: ApiService, private authService: AuthService, private messageService:MessageService, private router:Router) {
    this.agent.idUser = new Users();
    this.agent.idUser.idCompany = new Companies();
    this.agent.idUser.idRole = new Roles();

    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idRole = new Roles();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();

    this.agent.idUser.idCompany.name = this.accountTemp.idUser.idCompany.name;
    this.agent.idUser.idRole.name = 'Agent';
    this.agent.idUser.idRole.code = 'AGT';
    }

  ngOnInit() {
  }

  async insertAgent() {
    this.agent.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertAccount(this.agent).subscribe(company => {
      console.log(company);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      setTimeout(() => {
        this.router.navigateByUrl('admin/companies/view');
      }, 1000);
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
