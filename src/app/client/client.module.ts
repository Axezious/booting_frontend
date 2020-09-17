import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DtlTicketComponent } from './dtl-ticket/dtl-ticket.component';
import { ListTicketComponent } from './list-ticket/list-ticket.component';
import { InsertTicketComponent } from './insert-ticket/insert-ticket.component'
import { EmailRegistrasiComponent } from './email-registrasi/email-registrasi.component';
import { InsertCustomerComponent } from './insert-customer/insert-customer.component';
import { QuillModule } from 'ngx-quill';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ToastModule } from 'primeng/toast';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CheckboxModule } from 'primeng/checkbox';


const routes: Routes = [
  { path: 'dtl-ticket', component: DtlTicketComponent },
  { path: 'list-ticket', component: ListTicketComponent },
  { path: 'insert-ticket', component: InsertTicketComponent },
  { path: 'email-registrasi', component: EmailRegistrasiComponent },
  { path: 'insert-customer', component: InsertCustomerComponent },
  { path: 'view-customer', component: ViewCustomerComponent},
  { path: 'update-customer', component: UpdateCustomerComponent},
]

@NgModule({
  declarations: [
    DtlTicketComponent,
    ListTicketComponent,
    EmailRegistrasiComponent,
    InsertCustomerComponent,
    InsertTicketComponent,
    ViewCustomerComponent,
    UpdateCustomerComponent,
  ],
  imports: [
    CommonModule, NgbModule, FormsModule, CheckboxModule,
    RouterModule.forChild(routes),ToastModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction

          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],

          ['clean'],                                         // remove formatting button

          ['link', 'image', 'video']                         // link and image, video
          ['clean']                                    // remove formatting butto
        ]
      },
      theme: 'snow'
    })
  ]
})
export class ClientModule { }
