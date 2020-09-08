import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgentRelationsService } from '../../../../service/master/agent-relations.service';
import { Accounts } from 'src/app/model/accounts';
import { Observable } from 'rxjs';
import { AgentRelations } from 'src/app/model/agent-relations';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
    DatePipe, AgentRelationsService
  ]
})
export class ViewComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  agentRelations$:Observable<AgentRelations[]>;
  total$:Observable<number>;

  constructor(private service: AgentRelationsService, private apiService:ApiService, private authService:AuthService) {
    this.agentRelations$ = service.agentRelations$;
    this.total$ = service.total$;
  }

  ngOnInit() {
  }

}


