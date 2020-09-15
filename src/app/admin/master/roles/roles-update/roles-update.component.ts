import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

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

	constructor(private apiService: ApiService, private authService: AuthService, 
				private activatedRoute: ActivatedRoute, private messageService: MessageService,
				private router:Router) {
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
		this.role.id = this.temp.id;
		this.role.createdBy = this.temp.createdBy;
		this.role.updatedBy = this.authService.getAccount().idUser.name;
		this.apiService.updateRoles(this.role).subscribe(role => {
			console.log(this.role);
			this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Update Berhasil' });
			setTimeout(() => {
				this.router.navigateByUrl('admin/roles/view');
			}, 1000);
		}, err => {
			this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Update Gagal' });
		});

	}

}
