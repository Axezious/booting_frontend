import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { Roles } from '../../../../model/roles';

@Component({
  selector: 'app-roles-insert',
  templateUrl: './roles-insert.component.html',
  styleUrls: ['./roles-insert.component.scss']
})
export class RolesInsertComponent implements OnInit {

  roles:Roles;

  constructor(private apiService:ApiService) { 
  	this.roles = new Roles();
  }

  ngOnInit() {
  }

  async insertRoles() {
  	this.apiService.insertRoles(this.roles).subscribe(roles => {
  		console.log(roles);
  	})
  }

}
