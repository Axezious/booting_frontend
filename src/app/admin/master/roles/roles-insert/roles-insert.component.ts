import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Roles } from '../../../../model/roles';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-roles-insert',
  templateUrl: './roles-insert.component.html',
  styleUrls: ['./roles-insert.component.scss'],
  providers:[MessageService]
})
export class RolesInsertComponent implements OnInit {

  roles:Roles;

  constructor(private apiService:ApiService, private authService:AuthService, 
              private messageService:MessageService, private router:Router) { 
  	this.roles = new Roles();
  }

  ngOnInit() {
  }

  async insertRoles() {
    this.roles.createdBy = this.authService.getAccount().idUser.name;
  	this.apiService.insertRoles(this.roles).subscribe(roles => {
  		console.log(roles);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      setTimeout(() => {
        this.router.navigateByUrl('admin/roles/view');
      }, 2000);
		}, err => {
			this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
		});
  }

}
