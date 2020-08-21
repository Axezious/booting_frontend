import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
=======

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

>>>>>>> def579f3482b0bfcbca65b60a6787ae82de04396
import { DtlTicketComponent } from './dtl-ticket/dtl-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
<<<<<<< HEAD
import { EmailRegistrasiComponent } from './email-registrasi/email-registrasi.component';
import { InsertCustomerComponent } from './insert-customer/insert-customer.component'

const routes: Routes = [
  {path: 'dtl-ticket', component: DtlTicketComponent},
  {path: 'list-ticket', component: ListTicketComponent},
  {path: 'email-registrasi', component: EmailRegistrasiComponent},
  {path: 'insert-customer', component: InsertCustomerComponent}
]

@NgModule({
  declarations: [DtlTicketComponent, ListTicketComponent, EmailRegistrasiComponent, InsertCustomerComponent],
=======
import { InsertTicketComponent } from './insert-ticket/insert-ticket.component'

const routes: Routes = [
  { path: 'dtl-ticket', component: DtlTicketComponent },
  { path: 'list-ticket', component: ListTicketComponent },
  { path: 'insert-ticket', component: InsertTicketComponent }
]

@NgModule({
  declarations: [DtlTicketComponent, ListTicketComponent, InsertTicketComponent],
>>>>>>> 43ec33bde2b93f4c54133c390f069ed884841726
  imports: [
    CommonModule, NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
