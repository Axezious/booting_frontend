import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';
import { MessageService } from 'primeng/api';

import { Classifications } from '../../../../model/classifications';
import { ClassificationsService } from '../../../../service/master/classifications.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
  	ClassificationsService, MessageService
  ]
})
export class ViewComponent implements OnInit {

  classifications$:Observable<Classifications[]>;
  total$:Observable<number>;
  selectedDel:Classifications[] = []

  constructor(private service:ClassificationsService, private apiService:ApiService, private messageService: MessageService, private activatedRoute: ActivatedRoute) { 
  	this.classifications$ = service.classifications$;
    this.total$ = service.total$;
    

    window.addEventListener('storage', (event) => {
      if (event.key == 'coba') {
        console.log('Hello');
        localStorage.removeItem('coba');
      }
    })
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.get('updateFlag') == 'true') {
      console.log(this.activatedRoute.snapshot.queryParamMap.get('updateFlag'));
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Update Berhasil' });
      
    }
    this.showConfirm();
  }

  async deleteClassification(classification:Classifications) {
    this.apiService.deleteClassifications(classification).subscribe(classification =>{
      console.log(classification);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'info', detail: 'Deleted' });
      this.service.viewClassifications();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Failed'});
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteClassifications(this.selectedDel[i]).subscribe(company =>{
      console.log(company);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Deleted' });
      this.service.viewClassifications();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Failed' });
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
