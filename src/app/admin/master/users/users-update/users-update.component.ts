import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Users } from '../../../../model/users';
import { Roles } from '../../../../model/roles';
import { Companies } from '../../../../model/companies';

@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss']
})
export class UsersUpdateComponent implements OnInit {

  user:Users;
  temp:Users;
  roles:Roles[] = [];
  companies:Companies[] = [];

  walah:Roles;

  constructor(private apiService:ApiService, private authService:AuthService, private activatedRoute:ActivatedRoute) { 
  	this.user = new Users();
  	this.user.idRole = new Roles();
  	this.user.idCompany = new Companies();
  	this.temp = new Users();
  	this.getRoles();
  	this.getCompanies();
  	this.walah = this.roles[1];
  	console.log(this.user);
  	this.activatedRoute.queryParams.subscribe((data) => {
  		this.temp = <Users>data;
  		this.user.name = this.temp.name;

  	})
  }

  ngOnInit() {
  	
  }

  async getRoles() {
  	this.apiService.viewRoles().subscribe(roles => {
  		this.roles = roles;
  	})
  }

  async getCompanies() {
  	this.apiService.viewCompanies().subscribe(companies => {
  		this.companies = companies;
  	})
  }

  async updateCompany() {
  	this.user.id = this.temp.id;
  	this.user.createdBy = this.temp.createdBy;
  	this.user.updatedBy = this.authService.getAccount().idUser.name;
  	console.log(this.user);
  	this.apiService.updateUsers(this.user).subscribe(user =>{
  		console.log(this.user);
  	})
  }

}
