import { Component, QueryList, ViewChildren, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';
import { MessageService } from 'primeng/api';

import { Users } from '../../../../model/users';
import { UsersService } from '../../../../service/master/users.service';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  providers: [
    UsersService, MessageService
  ]
})



export class UsersViewComponent implements OnInit {
  parentMessage: string = "Parent Says Hello!!!!";
  users$:Observable<Users[]>;
  total$:Observable<number>;
  selectedDel:Users[] = [];

  constructor(private service: UsersService, private apiService:ApiService, private messageService:MessageService, private refresh:RefreshProfileService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.refresh.profile.subscribe(data =>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Update Berhasil' });
    })
  }

  async deleteUser(user:Users) {
    this.apiService.deleteUsers(user).subscribe(user =>{
      console.log(user);
      this.service.viewUsers();
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteUsers(this.selectedDel[i]).subscribe(user =>{
      console.log(user);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewUsers();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
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
