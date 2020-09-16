import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Classifications } from '../../../../model/classifications';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  classification: Classifications;

  constructor(private apiService: ApiService, private authService: AuthService, private messageService: MessageService, private router:Router) {
    this.classification = new Classifications();
  }

  ngOnInit() {
  }

  async insertClassification() {
    this.classification.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertClassifications(this.classification).subscribe(classification => {
      console.log(classification);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      setTimeout(() => {
        this.router.navigateByUrl('admin/classifications/view');
      }, 500)
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
