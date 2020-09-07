import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Companies } from 'src/app/model/companies';
import { Roles } from 'src/app/model/roles';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

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
    this.user.nip = activatedRoute.snapshot.queryParamMap.get('nip');
    console.log(this.user.nip);
    this.getUserByNip(this.user.nip);
  }

  ngOnInit() {
  }

  async getRoles() {
  	this.apiService.viewRoles().subscribe(roles => {
  		this.roles = roles;
  	})
  }

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
