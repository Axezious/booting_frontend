import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { InsertComponent } from './insert/insert.component';
import { ViewComponent } from './view/view.component';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

const routes:Routes = [
	{ path: 'view', component: ViewComponent },
	{ path: 'insert', component: InsertComponent },
]

@NgModule({
  declarations: [InsertComponent, ViewComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule, ToastModule,
    CheckboxModule, RouterModule.forChild(routes)
  ]
})
export class ClientProductsModule { }
