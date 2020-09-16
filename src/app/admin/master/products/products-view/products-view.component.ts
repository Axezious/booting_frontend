import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';
import { MessageService } from 'primeng/api';

import { Products } from '../../../../model/products';
import { ProductsService } from '../../../../service/master/products.service';

@Component({
  selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss'],
  providers: [
  	ProductsService, MessageService
  ]
})
export class ProductViewComponent implements OnInit {

  products$:Observable<Products[]>;
  total$:Observable<number>;
  param:Products = new Products();
  selectedDel:Products[] = [];

  constructor(private service:ProductsService, private apiService:ApiService, private messageService: MessageService) { 
  	this.products$ = service.products$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deleteProduct(product:Products) {
    this.apiService.deleteProducts(product).subscribe(product =>{
      console.log(product);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewProducts();
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteProducts(this.selectedDel[i]).subscribe(product =>{
      console.log(product);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      this.service.viewProducts();
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

