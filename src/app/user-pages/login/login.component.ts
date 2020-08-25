import { Component, OnInit } from '@angular/core';
import { Users } from '../../model/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user:Users;

  constructor() { }

  ngOnInit() {
  }

}
