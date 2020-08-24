import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'products', loadChildren: () => import('./master/products/products.module').then(m => m.ProductsModule) },
  { path: 'roles', loadChildren: () => import('./master/roles/roles.module').then(m => m.RolesModule) },
  { path: 'status', loadChildren: () => import('./master/status/status.module').then(m => m.StatusModule) },
  { path: 'users', loadChildren: () => import('./master/users/users.module').then(m => m.UsersModule) },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
