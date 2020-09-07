import { Component, OnInit } from '@angular/core';
import { Accounts } from '../../model/accounts';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  
  account:Accounts = new Accounts();

  constructor() { 

  }

  ngOnInit() {
  }

}
