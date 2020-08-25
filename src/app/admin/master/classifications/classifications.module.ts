import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { InsertComponent } from './insert/insert.component';

const routes:Routes = [
	{ path: 'view', component: ViewComponent },
	{ path: 'insert', component: InsertComponent },
]

@NgModule({
  declarations: [ViewComponent, InsertComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class ClassificationsModule { }
