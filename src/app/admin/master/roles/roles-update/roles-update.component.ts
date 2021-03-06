import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { UpdateSuccessService } from 'src/app/service/update-success.service';

import { Roles } from '../../../../model/roles';
import { MessageService } from 'primeng/api';


@Component({
	selector: 'app-roles-update',
	templateUrl: './roles-update.component.html',
	styleUrls: ['./roles-update.component.scss'],
	providers: [MessageService]
})
export class RolesUpdateComponent implements OnInit {

	role: Roles;
	temp: Roles;
	validasi = 0;

	constructor(private apiService: ApiService, private authService: AuthService,
		private activatedRoute: ActivatedRoute, private updateToast: UpdateSuccessService, private messageService: MessageService,
		private router: Router) {
		this.role = new Roles();
		this.temp = new Roles();
		console.log(this.role);
		this.activatedRoute.queryParams.subscribe((data) => {
			this.temp = <Roles>data;
			this.role.code = this.temp.code;
			this.role.name = this.temp.name;
		})
	}

	ngOnInit() {
	}

	iniFungsi() {
		localStorage.setItem('coba', 'coba');
	}

	async updateRole() {
		if (this.role.code==null || this.role.code==undefined || this.role.code=="") {
			return this.validasi = 1 ;
		}
		else {
			this.role.id = this.temp.id;
			this.role.createdBy = this.temp.createdBy;
			this.role.updatedBy = this.authService.getAccount().idUser.name;
			this.apiService.updateRoles(this.role).subscribe(role => {
				console.log(this.role);
				this.updateToast.callUpdateToast();
				this.router.navigateByUrl('admin/roles/view');
			}, err => {
				this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Failed' });
			});
		}


	}

}
