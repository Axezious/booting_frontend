import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertClientAccountComponent } from './insert-client-account/insert-client-account.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewClientComponent } from './view-client/view-client.component';


const routes:Routes = [
  {path: 'insert', component: InsertClientAccountComponent},
]

@NgModule({
  declarations: [InsertClientAccountComponent, ViewClientComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule, 
    RouterModule.forChild(routes)
  ]
})
export class ClientAccountModule { }
