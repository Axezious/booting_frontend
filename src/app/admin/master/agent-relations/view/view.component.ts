import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';

import { AgentRelations } from '../../../../model/agent-relations';
// import { AgentRelationsService } from '../../../../service/master/agent-relations.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
    DatePipe
  ]
})
export class ViewComponent implements OnInit {

  // agentRelations$: Observable<AgentRelations[]>;
  // total$: Observable<number>;

  constructor() { 
  	// this.agentRelations$ = service.agentRelations$;
  	// this.total$ = service.total$;
  }

  ngOnInit() {
  }

}


