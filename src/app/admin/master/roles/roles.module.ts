import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesInsertComponent } from './roles-insert/roles-insert.component';
import { RolesUpdateComponent } from './roles-update/roles-update.component';
import { RolesViewComponent } from './roles-view/roles-view.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes :Routes = [
  {path : 'insert-roles', component: RolesInsertComponent},
  {path : 'update-roles', component: RolesUpdateComponent},
  {path : 'view-roles', component: RolesViewComponent},
]

@NgModule({
  declarations: [RolesInsertComponent, RolesUpdateComponent, RolesViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    RouterModule.forChild(routes)
  ]
})
export class RolesModule { }
