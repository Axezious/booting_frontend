import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DtlTicketComponent } from './dtl-ticket/dtl-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { InsertTicketComponent } from './insert-ticket/insert-ticket.component'
import { EmailRegistrasiComponent } from './email-registrasi/email-registrasi.component';
import { InsertCustomerComponent } from './insert-customer/insert-customer.component'

const routes: Routes = [
  { path: 'dtl-ticket', component: DtlTicketComponent },
  { path: 'list-ticket', component: ListTicketComponent },
  { path: 'insert-ticket', component: InsertTicketComponent },
  { path: 'email-registrasi', component: EmailRegistrasiComponent},
  { path: 'insert-customer', component: InsertCustomerComponent}
]

@NgModule({
  declarations: [DtlTicketComponent, ListTicketComponent, EmailRegistrasiComponent, InsertCustomerComponent],
  imports: [
    CommonModule, NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
