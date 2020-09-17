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
  validasi = 0;
  code : string = ''

  constructor(private apiService: ApiService, private authService: AuthService,
    private messageService: MessageService, private router: Router, private insertToast: InsertSuccessService) {
    this.product = new Products();
    console.log(this.product.code);
    
  }

  ngOnInit() {
  }

  async insertProduct() {
    if(this.product.code==null || this.product.code==undefined || this.product.code==''){
      return this.validasi = 1;
    }
    else {
      this.product.createdBy = this.authService.getAccount().idUser.name;
      this.apiService.insertProducts(this.product).subscribe(product => {
        console.log(product);
        this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Succeed' });
        this.insertToast.callInsertToast();
        this.router.navigateByUrl('admin/products/view');
      }, err => {
        console.log(err.error);
        
        if (err.error == "duplicate key value violates unique constraint") {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'The code was already exist.Please try another one!' });
        }
        else {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Failed' });
        }
      });
    }   
  }

}
