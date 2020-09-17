import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MessageService } from 'primeng/api';
import { Accounts } from 'src/app/model/accounts';
import { ClientProducts } from 'src/app/model/client-products';
import { Companies } from 'src/app/model/companies';
import { Products } from 'src/app/model/products';
import { Roles } from 'src/app/model/roles';
import { Users } from 'src/app/model/users';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss'],
  providers: [MessageService]
})
export class InsertComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  companiesArr: Companies[] = [];
  companies: Companies = new Companies();
  companySelected: string;
  productsArr: Products[] = [];
  products: Products = new Products();
  productSelected: string;
  clientProducts: ClientProducts = new ClientProducts();

  constructor(private auth: AuthService, private apiService: ApiService, private router: Router, private refresh:RefreshProfileService, private messageService: MessageService) {
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp.idUser.idRole = new Roles();
    this.accountTemp = auth.getAccount();

    this.clientProducts.idCompany = new Companies();
    this.clientProducts.idProduct = new Products();
    this.clientProducts.createdBy = this.accountTemp.idUser.name;

    apiService.viewCompanies().subscribe( data => {
      console.log(data);
      this.companiesArr = data;
      this.companySelected = this.companiesArr[0].name
    })

    apiService.viewProducts().subscribe( data => {
      console.log(data);
      this.productsArr = data;
      this.productSelected = this.productsArr[0].code
    })
  }

  ngOnInit() {
  }

  submit() {
    this.clientProducts.idCompany.name = this.companySelected;
    this.clientProducts.idProduct.code = this.productSelected;
    console.log(this.clientProducts)
    this.apiService.insertClientProduct(this.clientProducts).subscribe(data => {
      console.log(data)
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Insert client-product success.' });
      this.refresh.callRefreshPhoto();
      this.router.navigateByUrl('/admin/client-products/view')
    }, err => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
    })
  }
}
