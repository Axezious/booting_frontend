import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Accounts } from '../../../../model/accounts';
import { AccountsService } from '../../../../service/master/accounts.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss'],
  providers: [
    AccountsService, DecimalPipe
  ]
})
export class AccountsViewComponent implements OnInit {

  accounts: Accounts[] = [];
  accounts$: Observable<Accounts[]>;
  total$: Observable<number>;
  roleHlper: string
  constructor(private service: AccountsService, private authservice: AuthService) {
    this.accounts$ = service.accounts$;
    this.total$ = service.total$;
    
  }

  ngOnInit() {
    let accounts = this.authservice.getAccount();
    console.log(accounts.idUser.idRole.code);
    this.roleHlper = accounts.idUser.idRole.code;
  }

}


