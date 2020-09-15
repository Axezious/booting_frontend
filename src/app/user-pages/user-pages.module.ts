import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ToastModule } from 'primeng/toast';
import {BlockUIModule} from 'primeng/blockui';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-pass', component: ForgotPasswordComponent },
  { path: 'edit-profile', component: ProfileComponent},
  { path: 'change-pass', component: ChangePasswordComponent },

]

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, ChangePasswordComponent,ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,ToastModule,BlockUIModule
  ]
})
export class UserPagesModule { }
