import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../service/api.service';
import { PrioritiesService } from '../../../../service/master/priorities.service';

import { Priorities } from '../../../../model/priorities';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [
  	PrioritiesService
  ]
})
export class UpdateComponent implements OnInit {

  priority:Priorities;

  constructor(private service:PrioritiesService, private apiService:ApiService) { 
  	this.priority = new Priorities();
  	
  	this.priority.name = 'name';
  	
  	console.log(service.getUpdatePriority);
  	
  }

  ngOnInit() {
  }

}
