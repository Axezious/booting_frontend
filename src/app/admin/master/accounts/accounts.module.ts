import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { AccountsViewComponent } from './accounts-view/accounts-view.component';
import { AccountsInsertComponent } from './accounts-insert/accounts-insert.component';
import { AccountsUpdateComponent } from './accounts-update/accounts-update.component';

const routes:Routes = [
	{ path: 'view', component: AccountsViewComponent },
	{ path: 'insert', component: AccountsInsertComponent },
	{ path: 'update', component: AccountsUpdateComponent },
]

@NgModule({
  declarations: [
  	AccountsViewComponent, AccountsInsertComponent, AccountsUpdateComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountsModule { }
