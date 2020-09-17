import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { Priorities } from '../../../../model/priorities';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  providers: [MessageService]
})
export class UpdateComponent implements OnInit {

  priority: Priorities;
  temp: Priorities;
  validasi = 0;

  constructor(private apiService: ApiService, private authService: AuthService, 
    private activatedRoute: ActivatedRoute, private messageService: MessageService, 
    private router: Router, private refresh:RefreshProfileService, private updateToast:NotificationService) {
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
    if(this.priority.code==null || this.priority.code==undefined || this.priority.code==''){
      return this.validasi = 1;
    }
    else {
      this.priority.id = this.temp.id;
      this.priority.createdBy = this.temp.createdBy;
      this.priority.updatedBy = this.authService.getAccount().idUser.name;
      this.apiService.updatePriorities(this.priority).subscribe(priority => {
        console.log(this.priority);
        // this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
        // this.refresh.callRefreshPhoto();
        this.updateToast.callUpdateToastSuccess("Priorities");
        this.router.navigateByUrl('admin/priorities/view');
      }, err => {
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Failed' });
      });
    }
   
  }
}
