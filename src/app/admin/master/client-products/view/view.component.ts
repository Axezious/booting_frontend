import { AuthService } from 'src/app/service/auth.service';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageService } from 'primeng/api';
import { ApiService } from '../../../../service/api.service';

import { Classifications } from '../../../../model/classifications';
import { ClientProducts } from 'src/app/model/client-products';
import { ClientProductsService } from '../../../../service/master/client-products.service';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers : [ClientProductsService, MessageService]
})
export class ViewComponent implements OnInit {

  clientProducts$:Observable<ClientProducts[]>;
  total$:Observable<number>;
  selectedDel:ClientProducts[] = [];

  constructor(private apiService:ApiService, private authService:AuthService, private service : ClientProductsService, private messageService: MessageService, private refresh:RefreshProfileService) { 
  	this.clientProducts$ = service.clientProducts$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
    this.refresh.profile.subscribe(data=>{
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
    })
  }

  async deleteClientProducts(clientProducts:ClientProducts) {
    this.apiService.deleteClientProduct(clientProducts).subscribe(classification =>{
      console.log(clientProducts);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewClientProducts();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' })
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteClientProduct(this.selectedDel[i]).subscribe(product =>{
      console.log(product);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewClientProducts();
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

