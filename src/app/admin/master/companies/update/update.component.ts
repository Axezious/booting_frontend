import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { UpdateSuccessService } from '../../../../service/update-success.service';

import { Companies } from '../../../../model/companies';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-update',
	templateUrl: './update.component.html',
	styleUrls: ['./update.component.scss'],
	providers: [MessageService]
})
export class UpdateComponent implements OnInit {

	company: Companies;
	temp: Companies;
	validasi = 0;

	constructor(private apiService: ApiService, private authService: AuthService,
		private activatedRoute: ActivatedRoute, private messageService: MessageService,
		private router: Router, private updateToast: UpdateSuccessService) {
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
		if (this.company.name==null || this.company.name==undefined || this.company.name=="") {
			return this.validasi = 1;
		}
		else {
			this.company.id = this.temp.id;
			this.company.createdBy = this.temp.createdBy;
			this.company.updatedBy = this.authService.getAccount().idUser.name;
			console.log(this.company);
			this.apiService.updateCompanies(this.company).subscribe(company => {
				console.log(this.company);
				this.updateToast.callUpdateToast();
				this.router.navigateByUrl('admin/companies/view');
			}, err => {
				this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Failed' });
			});
		}

	}

}
