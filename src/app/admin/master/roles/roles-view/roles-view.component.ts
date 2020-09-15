import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';
import { MessageService } from 'primeng/api';

import { Roles } from '../../../../model/roles';
import { RolesService } from '../../../../service/master/roles.service';

@Component({
  selector: 'app-roles-view',
  templateUrl: './roles-view.component.html',
  styleUrls: ['./roles-view.component.scss'],
  providers: [
  	RolesService, MessageService
  ]
})
export class RolesViewComponent implements OnInit {
  
  roles$:Observable<Roles[]>;
  total$:Observable<number>;
  selectedDel:Roles[] = [];

  constructor(private service:RolesService, private apiService:ApiService, 
              private messageService:MessageService, private activatedRoute: ActivatedRoute) { 
  	this.roles$ = service.roles$;
  	this.total$ = service.total$;

    if (this.activatedRoute.snapshot.queryParamMap.get('updateFlag') == 'true') {
      console.log(this.activatedRoute.snapshot.queryParamMap.get('updateFlag'));
      
    }

    window.addEventListener('storage', (event) => {
      if (event.key == 'coba') {
        console.log('Hello');
        localStorage.removeItem('coba');
      }
    })

  }

  ngOnInit() {
    this.messageService.add({ key: 'tc', sticky: true, severity: 'info', summary: 'Info', detail: 'Update Berhasil' });
  }

  async deleteRole(role:Roles) {
    this.apiService.deleteRoles(role).subscribe(role =>{
      console.log(role);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewRoles();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteRoles(this.selectedDel[i]).subscribe(role =>{
      console.log(role);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewRoles();
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
