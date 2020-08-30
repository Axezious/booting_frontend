import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Users } from '../../../../model/users';
import { Roles } from '../../../../model/roles';

@Component({
  selector: 'app-users-insert',
  templateUrl: './users-insert.component.html',
  styleUrls: ['./users-insert.component.scss']
})
export class UsersInsertComponent implements OnInit {

  users:Users;
  roles:Roles[] = [];

  constructor(private apiService:ApiService, private authService:AuthService) { 
  	this.users = new Users();
  	this.users.idRole = new Roles();
  	this.getRoles();
  }

  ngOnInit() {
  }

  async insertUsers() {
  	this.users.createdBy = this.authService.getAccount().idUser.name;
  	this.apiService.insertUsers(this.users).subscribe(users => {
  		console.log(users);
  	})
  }

  async getRoles() {
  	this.apiService.viewRoles().subscribe(roles => {
  		this.roles = roles;
  	})
  }

}
