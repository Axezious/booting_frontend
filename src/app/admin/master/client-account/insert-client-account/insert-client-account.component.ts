import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import { InsertSuccessService } from 'src/app/service/insert-success.service';
import { Accounts } from 'src/app/model/accounts';
import { Companies } from 'src/app/model/companies';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';
import { AgentRelations } from 'src/app/model/agent-relations';
import { NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-insert-client-account',
  templateUrl: './insert-client-account.component.html',
  styleUrls: ['./insert-client-account.component.scss'],
  providers: [MessageService]
})
export class InsertClientAccountComponent implements OnInit {

  account: Accounts = new Accounts();
  accountTemp: Accounts = new Accounts();
  users: Users[];
  agentSelected: string;
  agentRelation: AgentRelations = new AgentRelations();

  startDate: NgbDateStruct;
  endDate: NgbDateStruct;

  convertDate(data: NgbDateStruct) {
    if (this.endDate) {
      return new Date(data.year, data.month - 1, data.day);
    }
    return new Date();
  }

  constructor(private auth: AuthService, private apiService: ApiService,
              private messageService:MessageService, private insertToast:InsertSuccessService,
              private router:Router) {
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp.idUser.idRole = new Roles();

    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();

    this.agentRelation.idAgent = new Users();
    this.agentRelation.idCompany = new Companies();

    this.account.idUser.idRole.code = 'CLI';
    this.accountTemp = auth.getAccount();

    this.account.createdBy = this.accountTemp.idUser.name;
    this.account.idUser.createdBy = this.accountTemp.idUser.name;
    this.account.idUser.idCompany.createdBy = this.accountTemp.idUser.name;
    this.agentRelation.createdBy = this.accountTemp.idUser.name;

    apiService.viewAgent().subscribe(data => {
      console.log(data);
      this.users = data;
      this.agentSelected = this.users[0].nip;
    })
  }

  ngOnInit() {
  }

  async submit() {
    let counter:number = 0;

    this.agentRelation.idAgent.nip = this.account.idUser.nip;
    this.agentRelation.idCompany.name = this.account.idUser.idCompany.name;

    // console.log(this.account);
    // console.log(this.agentSelected);

    // console.log("start date " + this.convertDate(this.startDate));
    // console.log("end date " + this.convertDate(this.endDate));

    this.agentRelation.startDate = this.convertDate(this.startDate);
    this.agentRelation.endDate = this.convertDate(this.startDate);
    console.log(this.agentRelation);


    // harus async
    this.apiService.insertAccount(this.account).subscribe(data => {
      console.log(data);

      this.apiService.insertAgentRelation(this.agentRelation).subscribe(data => {
        console.log(data);
        counter++;
      }, err => {
          this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Delete Data Failed' });
      })
      counter++;
      this.insertToast.callInsertToast();
      this.router.navigateByUrl('admin/client-account/insert')
    }, err => {
        this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Delete Data Failed' });
    })

    // this.apiService.insertAgentRelation(this.agentRelation).subscribe(data => {
    //   console.log(data);
    // })

    this.account = new Accounts();
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.agentSelected = this.users[0].id;
  }

}
