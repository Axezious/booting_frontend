import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Accounts } from 'src/app/model/accounts';

import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { NotificationService } from 'src/app/service/notification.service';
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    MessageService
  ]
})
export class LoginComponent implements OnInit {

  account: Accounts = new Accounts();

  constructor(public auth: AuthService, public api: ApiService, private router: Router,
              private toast:NotificationService, private messageService:MessageService) {

  }

  ngOnInit() {
    this.toast.toastForgotPassSuccess.subscribe(data =>{
      console.log(data);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: `Your Password has Delivered to Your Email` });
    })
    this.toast.toastForgotPassFail.subscribe(data =>{
      this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Request Failed' });
    })
  }

  async login() {
    console.log(this.account);
    let loginHelper = await this.api.getToken(this.account);
    console.log("Ini Helper");
    console.log(loginHelper);
    if (loginHelper != null && loginHelper != undefined) {
      this.auth.setToken(loginHelper.token)
      this.auth.setAccount(loginHelper.account)
      this.router.navigateByUrl('/')
    } else {
      this.router.navigateByUrl('/user-pages/login')
    }
  }
}
