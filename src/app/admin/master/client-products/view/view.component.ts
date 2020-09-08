import { AuthService } from 'src/app/service/auth.service';
import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';

import { Classifications } from '../../../../model/classifications';
import { ClientProducts } from 'src/app/model/client-products';
import { ClientProductsService } from '../../../../service/master/client-products.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers : [ClientProductsService]
})
export class ViewComponent implements OnInit {

  clientProducts$:Observable<ClientProducts[]>;
  total$:Observable<number>;

  constructor(private apiService:ApiService, private authService:AuthService, private service : ClientProductsService) { 
  	this.clientProducts$ = service.clientProducts$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  // async deleteClientProducts(clientProducts:ClientProducts) {
  //   this.apiService.deleteClientProducts().subscribe(classification =>{
  //     console.log(classification);
  //     this.service.viewClientProducts();
  //   })
  // }
}

