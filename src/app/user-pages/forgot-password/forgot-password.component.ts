import { Component, OnInit } from '@angular/core';
import { Accounts } from '../../model/accounts';

import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  account:Accounts = new Accounts();

  constructor(private apiService:ApiService) { 

  }

  ngOnInit() {
  }

  async sendEmailForPassword() {
  	this.apiService.forgotPassword(this.account).subscribe(result => {
  		console.log(result);
  	});
  }

}
