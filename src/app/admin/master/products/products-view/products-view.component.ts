import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';

import { Products } from '../../../../model/products';
import { ProductsService } from '../../../../service/master/products.service';

@Component({
  selector: 'app-products-view',
    templateUrl: './products-view.component.html',
    styleUrls: ['./products-view.component.scss'],
  providers: [
  	ProductsService
  ]
})
export class ProductViewComponent implements OnInit {

  products$:Observable<Products[]>;
  total$:Observable<number>;

  constructor(private service:ProductsService, private apiService:ApiService) { 
  	this.products$ = service.products$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deleteProducts(products:Products) {
    this.apiService.deleteProducts(products).subscribe(products =>{
      console.log(products);
      this.service.viewProducts();
    })
  }
  
}

