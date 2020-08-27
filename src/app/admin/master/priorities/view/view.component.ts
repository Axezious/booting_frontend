import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

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

  constructor(private service:PrioritiesService) { 
  	this.priorities$ = service.priorities$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

}

