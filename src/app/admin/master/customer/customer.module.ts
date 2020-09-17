import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';

const routes:Routes = [
  {path: 'view', component: ViewCustomerComponent},
]

@NgModule({
  declarations: [ViewCustomerComponent],
  imports: [
    CommonModule, FormsModule,  ReactiveFormsModule, NgbModule, ToastModule,
    CheckboxModule, RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
