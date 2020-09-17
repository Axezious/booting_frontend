import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/model/accounts';
import { Companies } from 'src/app/model/companies';
import { Users } from 'src/app/model/users';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { AgentService } from 'src/app/service/master/agent.service';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.scss']
})
export class ViewAgentComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  users$:Observable<Users[]>;
  total$:Observable<number>;

  constructor(private service:AgentService, private apiService:ApiService, private authService:AuthService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
    
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();
  }

  ngOnInit() {
  }

}
