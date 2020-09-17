import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Classifications } from '../../../../model/classifications';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';
import { InsertSuccessService } from 'src/app/service/insert-success.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  classification: Classifications;
  validasi = 0;

  constructor(private apiService: ApiService, private authService: AuthService, private messageService: MessageService,
    private router: Router, private refresh: RefreshProfileService, private insertToast: InsertSuccessService) {
    this.classification = new Classifications();
  }

  ngOnInit() {
  }

  async insertClassification() {
    if (this.classification.code == null || this.classification.code == undefined || this.classification.code == '') {
      return this.validasi = 1;
    }
    else {
      this.classification.createdBy = this.authService.getAccount().idUser.name;
      this.apiService.insertClassifications(this.classification).subscribe(classification => {
        console.log(classification);
        this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
        // this.refresh.callRefreshPhoto();
        this.insertToast.callInsertToast();
        this.router.navigateByUrl('admin/classifications/view');
      }, err => {
        if (err.error == "duplicate key value violates unique constraint") {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'The code was already exist.Please try another one!' });

        } else {
          this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Failed' });

        }
      });
    }

  }

}
