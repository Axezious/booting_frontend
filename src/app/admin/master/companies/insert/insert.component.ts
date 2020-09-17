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
  providers:[MessageService]
})
export class InsertComponent implements OnInit {

  company: Companies;

  constructor(private apiService: ApiService, private authService: AuthService,
              private messageService:MessageService, private router:Router,
              private insertToast:InsertSuccessService) {
    
    this.company = new Companies();
  }

  ngOnInit() {
  }

  async insertCompany() {
    this.company.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertCompanies(this.company).subscribe(company => {
      console.log(company);
        this.insertToast.callInsertToast();
        this.router.navigateByUrl('admin/companies/view');
      
    }, err => {
      this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
