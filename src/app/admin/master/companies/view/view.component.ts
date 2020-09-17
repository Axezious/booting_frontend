import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';
import { MessageService } from 'primeng/api';

import { Companies } from '../../../../model/companies';
import { CompaniesService } from '../../../../service/master/companies.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
  	CompaniesService, MessageService
  ]
})
export class ViewComponent implements OnInit {

  companies$:Observable<Companies[]>;
  total$:Observable<number>;
  selectedDel:Companies[] = [];

  constructor(private service:CompaniesService, private apiService:ApiService, private messageService: MessageService) { 
  	this.companies$ = service.companies$;
  	this.total$ = service.total$;

  }

  ngOnInit() {
  }

  async deleteCompany(company:Companies) {
    this.apiService.deleteCompanies(company).subscribe(company =>{
      console.log(company);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewCompanies();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteCompanies(this.selectedDel[i]).subscribe(company =>{
      console.log(company);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Delete Data Success' });
      this.service.viewCompanies();
    }, err => {
      this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Delete Data Failed' });
    })
    }
  }

  showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'sc', sticky: true, severity:'warn', summary:'Are you sure about this?', detail:'Confirm to proceed'});
    }

  onConfirm() {
        // this.deleteCompany(this.param);
        this.deleteAll();
        this.messageService.clear('sc');
        this.selectedDel = [];
    }

    onReject() {
        this.messageService.clear('sc');
    }
  
}
