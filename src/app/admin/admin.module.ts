import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from "./admin-routing.module";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ListAgentsComponent } from './agent/list-agents/list-agents.component';


@NgModule({
  declarations: [
    ListAgentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AdminRoutingModule,
    ToastModule
  ]
})
export class AdminModule { }
