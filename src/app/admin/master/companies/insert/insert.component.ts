import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { InsertSuccessService } from '../../../../service/insert-success.service';

import { Companies } from '../../../../model/companies';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  company: Companies;
  validasi = 0;

  constructor(private apiService: ApiService, private authService: AuthService,
    private messageService: MessageService, private router: Router,
    private insertToast: InsertSuccessService) {

    this.company = new Companies();
  }

  ngOnInit() {
  }

  async insertCompany() {
    if (this.company.name==null || this.company.name==undefined || this.company.name=='') {
      return this.validasi = 1;
    }
    else {
      this.company.createdBy = this.authService.getAccount().idUser.name;
      this.apiService.insertCompanies(this.company).subscribe(company => {
        console.log(company);
        this.insertToast.callInsertToast();
        this.router.navigateByUrl('admin/companies/view');
      }, err => {
        this.messageService.add({ key: 'tc',  severity: 'error', summary: 'Info', detail: 'Failed' });
      });
    }

  }

}
