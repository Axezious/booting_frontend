import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AgentRelations } from '../../../model/agent-relations';
import { Companies } from '../../../model/companies';
import { AgentRelationsService } from '../../../service/master/agent-relations.service';
import { ListAgentsService } from '../../../service/list-agents.service';

@Component({
  selector: 'app-list-agents',
  templateUrl: './list-agents.component.html',
  styleUrls: ['./list-agents.component.scss'],
  providers: [
    DatePipe, AgentRelationsService, ListAgentsService
  ]
})
export class ListAgentsComponent implements OnInit {

  agentRelations$: Observable<AgentRelations[]>;
  companies$: Observable<Companies[]>;
  total$: Observable<number>;
  total2$: Observable<number>;

  constructor(private service:AgentRelationsService, private modalService: NgbModal, private service2:ListAgentsService) { 
  	this.agentRelations$ = service.agentRelations$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  openMediumModal( mediumModalContent ) {
  	this.companies$ = this.service2.companies$;
  	this.total2$ = this.service2.total$;

  	console.log(this.companies$);
  	console.log(this.agentRelations$);
  		
    this.modalService.open( mediumModalContent, { size : 'lg' } );
  }

}
