import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from '../../../../service/api.service';

import {Priorities} from '../../../../model/priorities';
import {PrioritiesService} from '../../../../service/master/priorities.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
  	PrioritiesService
  ]
})
export class ViewComponent implements OnInit {

  priorities$ :Observable<Priorities[]>;
  total$ :Observable<number>;

  constructor(private service:PrioritiesService, private apiService:ApiService) { 
  	this.priorities$ = service.priorities$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deletePriority(priority:Priorities) {
    this.apiService.deletePriorities(priority).subscribe(priority =>{
      console.log(priority);
      this.service.viewPriorities();
    })
  }

}
