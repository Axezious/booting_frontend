import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Companies } from '../../../../model/companies';

@Component({
	selector: 'app-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

	company: Companies;
	temp: Companies;

	constructor(private apiService: ApiService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
		this.company = new Companies();
		this.temp = new Companies();
		console.log(this.company);
		this.activatedRoute.queryParams.subscribe((data) => {
			this.temp = <Companies>data;
			this.company.name = this.temp.name;
		})
	}

	ngOnInit() {

	}

	async updateCompany() {
		this.company.id = this.temp.id;
		this.company.createdBy = this.temp.createdBy;
		this.company.updatedBy = this.authService.getAccount().idUser.name;
		console.log(this.company);
		this.apiService.updateCompanies(this.company).subscribe(company => {
			console.log(this.company);
		})
	}

}
