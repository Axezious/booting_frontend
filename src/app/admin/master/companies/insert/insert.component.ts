import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

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

  constructor(private apiService: ApiService, private authService: AuthService,private messageService:MessageService) {
    this.company = new Companies();
  }

  ngOnInit() {
  }

  async insertCompany() {
    this.company.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertCompanies(this.company).subscribe(company => {
      console.log(company);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
