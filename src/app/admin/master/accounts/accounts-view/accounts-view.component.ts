import {DecimalPipe} from '@angular/common';
import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Accounts} from '../../../../model/accounts';
import {AccountsService} from '../../../../service/master/accounts.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss'],
  providers: [
  	AccountsService, DecimalPipe
  ]
})
export class AccountsViewComponent implements OnInit {

  accounts$: Observable<Accounts[]>;
  total$: Observable<number>;

  constructor(public service:AccountsService) { 
  	this.accounts$ = service.accounts$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

}


