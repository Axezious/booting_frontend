import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
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

  constructor(private apiService:ApiService,private messageService:MessageService) { 
  	this.roles = new Roles();
  }

  ngOnInit() {
  }

  async insertRoles() {
  	this.apiService.insertRoles(this.roles).subscribe(roles => {
  		console.log(roles);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
		}, err => {
			this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
		});
  }

}
