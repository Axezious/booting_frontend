import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Products } from '../../../../model/products';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';
import { InsertSuccessService } from 'src/app/service/insert-success.service';

@Component({
  selector: 'app-products-insert',
  templateUrl: './products-insert.component.html',
  styleUrls: ['./products-insert.component.scss'],
  providers: [MessageService]
})
export class ProductsInsertComponent implements OnInit {

  product: Products;

  constructor(private apiService: ApiService, private authService: AuthService,
    private messageService: MessageService, private router: Router, private insertToast:InsertSuccessService) {
    this.product = new Products();
  }

  ngOnInit() {
  }

  async insertProduct() {
    this.product.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertProducts(this.product).subscribe(product => {
      console.log(product);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil Nih' });   
      this.insertToast.callInsertToast();
      this.router.navigateByUrl('admin/products/view');      
    }, err => {
      this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    });
  }

}
