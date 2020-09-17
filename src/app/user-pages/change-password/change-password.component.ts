import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Accounts } from '../../model/accounts';

import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  account:Accounts = new Accounts();
  menu:boolean = false;
  match:boolean = false;
  submit1:boolean = true;
  submit2:boolean = false;

  pass1:string;
  pass2:string;

  oldPass:string;
  email:string;

  constructor(private apiService:ApiService, private notif:NotificationService,
              private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.email = this.authService.getAccount().email;
  }

  oldPassword() {
  	if (this.pass1 == this.pass2) {
  		this.menu = true;
  		this.submit1 = false;
  		this.submit2 = true;

  		this.oldPass = this.pass2;
  		this.pass1 = null;
  		this.pass2 = null;
  		this.match = false;
  	}

  	else {
  		this.match = true;
  	}
  }

  async changePassword() {
  	if (this.pass1 == this.pass2) {
  		
  		this.account.pass = this.pass2;

  		let changePass = {
  			idAccount : this.account,
  			pass : this.oldPass
  		}

  		
  		this.apiService.changePassword(changePass).subscribe(result => {
  			console.log(result);
        this.notif.callChangePassSuccess('');
        this.router.navigateByUrl('user-pages/edit-profile');
      }, err => {
        this.notif.callChangePassFail('');
        this.router.navigateByUrl('user-pages/edit-profile');	
  		})
  	}

  	else {
  		this.match = true;
  	}
  }

}
