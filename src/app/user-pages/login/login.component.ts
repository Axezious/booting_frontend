import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user : Accounts = new Accounts()

  constructor(public auth : AuthService,public api : ApiService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.api.getToken(this.user)
    this.auth.setToken('ini token');
    console.log(this.auth.getToken());
    this.router.navigateByUrl('client/insert-ticket')
  }
}
