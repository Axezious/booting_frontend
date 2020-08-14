import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { DtlTicketComponent } from './dtl-ticket/dtl-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component'

const routes: Routes = [
  {path: 'dtl-ticket', component: DtlTicketComponent},
  {path: 'list-ticket', component: ListTicketComponent}
]

@NgModule({
  declarations: [DtlTicketComponent, ListTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
