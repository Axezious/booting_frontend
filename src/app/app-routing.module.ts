import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {ActivateService} from './service/activate.service'
import { CommonModule } from '@angular/common';
import { AdminPermitService } from './service/admin-permit.service';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent,
    canActivate: [ActivateService] },
  
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },


  {
    path: 'client', loadChildren: () =>
      import('./client/client.module')
        .then(m => m.ClientModule),
        canActivate: [ActivateService]
  },
  {
    path: 'admin', loadChildren: () =>
      import('./admin/admin.module')
        .then(m => m.AdminModule),
        canActivate: [ActivateService, AdminPermitService]
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
