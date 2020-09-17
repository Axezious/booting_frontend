import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Accounts } from '../../model/accounts';

import { ApiService } from '../../service/api.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  account:Accounts = new Accounts();

  constructor(private apiService:ApiService, private notif:NotificationService,
              private router:Router) { 

  }

  ngOnInit() {
  }

  async sendEmailForPassword() {
  	this.apiService.forgotPassword(this.account).subscribe(result => {
  		console.log(result);
      this.notif.callForgotPassSuccess('test');
      this.router.navigateByUrl('user-pages/login');
  	}, err => {
      this.notif.callForgotPassFail('test');
      this.router.navigateByUrl('user-pages/login');
    });
  }

}
