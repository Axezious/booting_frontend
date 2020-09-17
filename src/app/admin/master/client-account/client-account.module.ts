import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertClientAccountComponent } from './insert-client-account/insert-client-account.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewClientComponent } from './view-client/view-client.component';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

const routes:Routes = [
  {path: 'insert', component: InsertClientAccountComponent},
  {path: 'view', component: ViewClientComponent},
]

@NgModule({
  declarations: [InsertClientAccountComponent, ViewClientComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule, 
    ToastModule, CheckboxModule, RouterModule.forChild(routes)
  ],
  exports: [InsertClientAccountComponent],
  bootstrap: [InsertClientAccountComponent],
})
export class ClientAccountModule { }
