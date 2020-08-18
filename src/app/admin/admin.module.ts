import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { AccountsComponent } from './master/accounts/accounts.component';

const routes: Routes = [
  {path: 'view-ticket', component: ViewTicketComponent},
  {path: 'master/accounts', component: AccountsComponent},
]

@NgModule({
  declarations: [ViewTicketComponent, AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
