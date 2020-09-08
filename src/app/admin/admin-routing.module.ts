import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAgentsComponent } from './agent/list-agents/list-agents.component';

const routes: Routes = [
  { path: 'products', loadChildren: () => import('./master/products/products.module').then(m => m.ProductsModule) },
  { path: 'roles', loadChildren: () => import('./master/roles/roles.module').then(m => m.RolesModule) },
  { path: 'status', loadChildren: () => import('./master/status/status.module').then(m => m.StatusModule) },
  { path: 'users', loadChildren: () => import('./master/users/users.module').then(m => m.UsersModule) },
  { path: 'accounts', loadChildren: () => import('./master/accounts/accounts.module').then(m => m.AccountsModule) },
  { path: 'agent-relations', loadChildren: () => import('./master/agent-relations/agent-relations.module').then(m => m.AgentRelationsModule) },
  { path: 'classifications', loadChildren: () => import('./master/classifications/classifications.module').then(m => m.ClassificationsModule) },
  { path: 'client-products', loadChildren: () => import('./master/client-products/client-products.module').then(m => m.ClientProductsModule) },
  { path: 'companies', loadChildren: () => import('./master/companies/companies.module').then(m => m.CompaniesModule) },
  { path: 'priorities', loadChildren: () => import('./master/priorities/priorities.module').then(m => m.PrioritiesModule) },
  { path: 'client-account', loadChildren: () => import('./master/client-account/client-account.module').then(m => m.ClientAccountModule) },  
  { path: 'list-agents', component: ListAgentsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
