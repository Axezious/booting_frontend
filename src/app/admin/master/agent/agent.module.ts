import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAgentComponent } from './view-agent/view-agent.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { InsertAgentComponent } from './insert-agent/insert-agent.component';

const routes:Routes = [
  {path: 'view', component: ViewAgentComponent},
  {path: 'insert', component: InsertAgentComponent}
]

@NgModule({
  declarations: [ViewAgentComponent, InsertAgentComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, NgbModule, ToastModule,
    CheckboxModule, RouterModule.forChild(routes)
  ]
})
export class AgentModule { }
