import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersViewComponent } from './users-view/users-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersInsertComponent } from './users-insert/users-insert.component';
import { UsersUpdateComponent } from './users-update/users-update.component';

const routes :Routes = [
  {path : 'insert', component: UsersInsertComponent},
  {path : 'update', component: UsersUpdateComponent},
  {path : 'view', component: UsersViewComponent},
]

@NgModule({
  declarations: [UsersViewComponent, UsersInsertComponent, UsersUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
