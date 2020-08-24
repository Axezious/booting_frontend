import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StatusViewComponent } from './status-view/status-view.component';
import { StatusInsertComponent } from './status-insert/status-insert.component';
import { StatusUpdateComponent } from './status-update/status-update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes :Routes = [
  {path : 'insert-status', component: StatusInsertComponent},
  {path : 'update-status', component: StatusUpdateComponent},
  {path : 'view-status', component: StatusViewComponent},
]

@NgModule({
  declarations: [StatusViewComponent, StatusInsertComponent, StatusUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    RouterModule.forChild(routes)
  ]
})
export class StatusModule { }
