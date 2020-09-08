import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Products } from '../../../../model/products';

@Component({
  selector: 'app-products-insert',
  templateUrl: './products-insert.component.html',
  styleUrls: ['./products-insert.component.scss']
})
export class ProductsInsertComponent implements OnInit {

  product:Products;	

  constructor(private apiService:ApiService, private authService:AuthService) { 
  	this.product = new Products();
  }

  ngOnInit() {
  }

  async insertProduct() {
  	this.product.createdBy = this.authService.getAccount().idUser.name;
  	this.apiService.insertProducts(this.product).subscribe(products =>{
  		console.log(products);
  	})
  }

}
