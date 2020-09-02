import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Companies } from '../../../../model/companies';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  company:Companies;	

  constructor(private apiService:ApiService, private authService:AuthService) { 
  	this.company = new Companies();
  }

  ngOnInit() {
  }

  async insertCompany() {
  	this.company.createdBy = this.authService.getAccount().idUser.name;
  	this.apiService.insertCompanies(this.company).subscribe(company =>{
  		console.log(company);
  	})
  }

}
