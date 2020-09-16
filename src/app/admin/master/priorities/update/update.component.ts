import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Priorities } from '../../../../model/priorities';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService]
})
export class UpdateComponent implements OnInit {

  priority: Priorities;
  temp: Priorities;

  constructor(private apiService: ApiService, private authService: AuthService, 
    private activatedRoute: ActivatedRoute, private messageService: MessageService, 
    private router: Router, private refresh:RefreshProfileService) {
    this.priority = new Priorities();
    this.temp = new Priorities();

    this.activatedRoute.queryParams.subscribe((data) => {
      this.temp = <Priorities>data;
      this.priority.name = this.temp.name;
      this.priority.code = this.temp.code;
    })
  }

  ngOnInit() {

  }

  async updatePriority() {
    this.priority.id = this.temp.id;
    this.priority.createdBy = this.temp.createdBy;
    this.priority.updatedBy = this.authService.getAccount().idUser.name;

    this.apiService.updatePriorities(this.priority).subscribe(priority => {
      console.log(this.priority);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.refresh.callRefreshPhoto();
      this.router.navigateByUrl('admin/priorities/view');

    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }
}
