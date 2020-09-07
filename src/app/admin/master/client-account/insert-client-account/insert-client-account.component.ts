import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { Accounts } from 'src/app/model/accounts';
import { Companies } from 'src/app/model/companies';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';
import { AgentRelations } from 'src/app/model/agent-relations';
import {NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-insert-client-account',
  templateUrl: './insert-client-account.component.html',
  styleUrls: ['./insert-client-account.component.scss']
})
export class InsertClientAccountComponent implements OnInit {

  account: Accounts = new Accounts();
  accountTemp: Accounts = new Accounts();
  users:Users[];
  agentSelected:string;
  agentRelation:AgentRelations = new AgentRelations();

  endDate:NgbDateStruct;
  convertDate(){
    if(this.endDate){
      return new Date(this.endDate.year,this.endDate.month-1,this.endDate.day);
    }
    return new Date();
    
  }

  constructor(private auth: AuthService, private apiService: ApiService) {
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp.idUser.idRole = new Roles();

    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();

    this.agentRelation.idAgent = new Users();
    this.agentRelation.idCompany = new Companies();

    this.account.idUser.idRole.code = 'CL';
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

    this.agentRelation.idAgent.nip = this.account.idUser.nip;
    this.agentRelation.idCompany.name = this.account.idUser.idCompany.name;
    // this.agentRelation.startDate = 
    
    console.log(this.account);
    // console.log(this.agentSelected);
    console.log(this.agentRelation);
    console.log("date "+this.convertDate());
    this.agentRelation.endDate = this.convertDate();
    

    // harus async
    // this.apiService.insertAccount(this.account).subscribe(data => {
    //   console.log(data);

    //   this.apiService.insertAgentRelation(this.agentRelation).subscribe(data => {
    //     console.log(data);
    //   })
    // })

    // this.apiService.insertAgentRelation(this.agentRelation).subscribe(data => {
    //   console.log(data);
    // })

    this.account = new Accounts();
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    // this.agentSelected = this.users[0].id;
  }

}
