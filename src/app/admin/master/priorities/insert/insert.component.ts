import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Priorities } from '../../../../model/priorities';
import { Users } from '../../../../model/users';
import { Companies } from '../../../../model/companies';
import { Accounts } from '../../../../model/accounts';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  priorities: Priorities;

  constructor(private apiService: ApiService, private authService: AuthService, private messageService: MessageService) {
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
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
