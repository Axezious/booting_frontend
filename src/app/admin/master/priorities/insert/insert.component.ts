import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Priorities } from '../../../../model/priorities';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  priorities: Priorities;
  validasi = 0;

  constructor(private apiService: ApiService, private authService: AuthService, private messageService: MessageService,
    private router: Router, private refresh: RefreshProfileService, private insertToast: NotificationService) {
    this.priorities = new Priorities();
    console.log('walah dalah ini insert')
  }

  ngOnInit() {
  }

  async insertPriorities() {
    if (this.priorities.code == null || this.priorities.code == undefined || this.priorities.code == "") {
      return this.validasi = 1;
    }
    else {
      this.priorities.createdBy = this.authService.getAccount().idUser.name;
      this.apiService.insertPriorities(this.priorities).subscribe(priorities => {
        console.log(priorities);
        this.insertToast.callInsertToastSuccess("Priorities");
        this.router.navigateByUrl('admin/priorities/view');
      }, err => {
        console.log(err);
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'The code was already exist.Please try another one!' });
      });
    }

  }

}
