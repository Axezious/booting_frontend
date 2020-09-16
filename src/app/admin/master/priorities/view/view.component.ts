import {Component, QueryList, ViewChildren, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {ApiService} from '../../../../service/api.service';
import {MessageService} from 'primeng/api';

import {Priorities} from '../../../../model/priorities';
import {PrioritiesService} from '../../../../service/master/priorities.service';

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

  constructor(private service:PrioritiesService, private apiService:ApiService, private messageService: MessageService) { 
  	this.priorities$ = service.priorities$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deletePriority(priority:Priorities) {
    this.apiService.deletePriorities(priority).subscribe(priority =>{
      console.log(priority);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
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
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewPriorities();
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
