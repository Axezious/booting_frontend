import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from '../../../../service/api.service';
import {MessageService} from 'primeng/api';

import {Priorities} from '../../../../model/priorities';
import {PrioritiesService} from '../../../../service/master/priorities.service';
import {RefreshProfileService} from 'src/app/service/refresh-profile.service';
import {ActivatedRoute} from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
  	PrioritiesService, MessageService
  ]
})
export class ViewComponent implements OnInit {

  priorities$ :Observable<Priorities[]>;
  total$ :Observable<number>;
  selectedDel:Priorities[] = [];

  constructor(private service:PrioritiesService, private apiService:ApiService, 
    private messageService: MessageService, private refresh:RefreshProfileService, 
    private activatedRoute: ActivatedRoute, private deleteToast:NotificationService) { 
  	this.priorities$ = service.priorities$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
    // this.refresh.profile.subscribe(data=>{
    //   this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
    // })

    if (this.activatedRoute.snapshot.queryParamMap.get('updateFlag') == 'true') {
      console.log(this.activatedRoute.snapshot.queryParamMap.get('updateFlag'));
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Update Berhasil' });
      
    }
    this.showConfirm();
  }

  async deletePriority(priority:Priorities) {
    this.apiService.deletePriorities(priority).subscribe(priority =>{
      console.log(priority);
      // this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.deleteToast.callDeleteToastSuccess("Priorities");
      this.service.viewPriorities();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' })
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deletePriorities(this.selectedDel[i]).subscribe(product =>{
      console.log(product);
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Success', detail: 'Delete Berhasil' });
      this.service.viewPriorities();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Error', detail: 'Delete Gagal' });
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
