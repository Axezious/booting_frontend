import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Companies } from '../../../../model/companies';
import { CompaniesService } from '../../../../service/master/companies.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
  	CompaniesService
  ]
})
export class ViewComponent implements OnInit {

  companies$:Observable<Companies[]>;
  total$:Observable<number>;

  constructor(private service:CompaniesService) { 
  	this.companies$ = service.companies$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

}
