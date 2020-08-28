import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Roles } from '../../../../model/roles';
import { RolesService } from '../../../../service/master/roles.service';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.scss'],
  providers: [
  	RolesService
  ]
})
export class RolesViewComponent implements OnInit {
  
  roles$:Observable<Roles[]>;
  total$:Observable<number>;

  constructor(private service:RolesService) { 
  	this.roles$ = service.roles$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

}
