import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Priorities } from '../../../../model/priorities';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';


@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  priorities: Priorities;

  constructor(private apiService: ApiService, private authService: AuthService, private messageService: MessageService, 
    private router:Router, private refresh:RefreshProfileService) {
    this.priorities = new Priorities();
    console.log('walah dalah ini insert')
  }

  ngOnInit() {
  }

  async insertPriorities() {
    this.priorities.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertPriorities(this.priorities).subscribe(priorities => {
      console.log(priorities);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.refresh.callRefreshPhoto();
      this.router.navigateByUrl('admin/priorities/view');
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
