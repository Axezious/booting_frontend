import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Users } from '../../../../model/users';
import { Roles } from '../../../../model/roles';
import { Companies } from '../../../../model/companies';

@Component({
  selector: 'app-users-insert',
  templateUrl: './users-insert.component.html',
  styleUrls: ['./users-insert.component.scss']
})
export class UsersInsertComponent implements OnInit {

  users:Users;
  roles:Roles[] = [];
  // companies:Companies[] = [];

  constructor(private apiService:ApiService, private authService:AuthService) { 
  	this.users = new Users();
  	this.users.idRole = new Roles();
  	this.users.idCompany = new Companies();
  	this.getRoles();
  	// this.getCompanies();
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

  // async getCompanies() {
  // 	this.apiService.viewCompanies().subscribe(companies => {
  // 		this.companies = companies;
  // 	})
  // }

}
