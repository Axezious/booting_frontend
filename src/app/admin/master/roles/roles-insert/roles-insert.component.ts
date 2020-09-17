import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { InsertSuccessService } from 'src/app/service/insert-success.service';

import { Roles } from '../../../../model/roles';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-roles-insert',
  templateUrl: './roles-insert.component.html',
  styleUrls: ['./roles-insert.component.scss'],
  providers: [MessageService]
})
export class RolesInsertComponent implements OnInit {

  roles: Roles;
  validasi = 0;

  constructor(private apiService: ApiService, private authService: AuthService,
    private messageService: MessageService, private router: Router, private insertToast: InsertSuccessService) {
    this.roles = new Roles();
  }

  ngOnInit() {
  }

  async insertRoles() {
    if (this.roles.code == null || this.roles.code == undefined || this.roles.code == '') {
      return this.validasi = 1;
    }
    else {
      this.roles.createdBy = this.authService.getAccount().idUser.name;
      this.apiService.insertRoles(this.roles).subscribe(roles => {
        console.log(roles);
        this.insertToast.callInsertToast();
        this.router.navigateByUrl('admin/roles/view');
      }, err => {
        if (err.error == "duplicate key value violates unique constraint") {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'The code was already exist.Please try another one!' });
        }
        else {
          this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Failed' });
        }
      });
    }
  }

}
