import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Users } from '../../../../model/users';
import { Roles } from '../../../../model/roles';
import { Companies } from '../../../../model/companies';
import { UsersViewComponent } from '../users-view/users-view.component';

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

  constructor(private apiService:ApiService, private authService:AuthService, private activatedRoute:ActivatedRoute) { 
  	this.user = new Users();

  	this.user.idRole = new Roles();
  	this.user.idCompany = new Companies();
  	this.temp = new Users();
  	this.getRoles();
  	// this.getCompanies();
     this.user.nip = this.activatedRoute.snapshot.queryParamMap.get('nip');
     console.log(this.user.nip);
     this.getUserByNip(this.user.nip);
    //  console.log(firstparam);
  	// this.activatedRoute.queryParams.subscribe((data) => {

   //    console.log(data);



      
  		
    //   this.temp = <Users>data;
  		// this.user.name = this.temp.name;
    //   this.user.nip = this.temp.nip;
    //   this.user.contact = this.temp.contact;
    //   this.user.address = this.temp.address;
    //   this.user.idCompany.name = this.temp.companyName;
    //   this.user.idRole.name = this.temp.idRole.name;

  	// })
  }

  ngOnInit() {
  	
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

  async getUserByNip(nip:string) {
    this.apiService.getUserByNip(nip).subscribe(result => {
      console.log(result);
      this.user = result;
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
