import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { Products } from '../../../../model/products';
import { MessageService } from 'primeng/api';


@Component({
	selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.scss'],
	providers: [MessageService]
})
export class ProductsUpdateComponent implements OnInit {

	product: Products;
	temp: Products;

	constructor(private apiService: ApiService, private authService: AuthService, private activatedRoute: ActivatedRoute,private messeageService:MessageService, private router:Router) {
		this.product = new Products();
		this.temp = new Products();
		this.activatedRoute.queryParams.subscribe((data) => {
			this.temp = <Products>data;
			this.product.name = this.temp.name;
      this.product.code = this.temp.code;
      this.product.description = this.temp.description;      
		})
	}

	ngOnInit() {

	}
	async updateProduct() {
		this.product.id = this.temp.id;
		this.product.createdBy = this.temp.createdBy;
		this.product.updatedBy = this.authService.getAccount().idUser.name;
		console.log(this.product);
		this.apiService.updateProducts(this.product).subscribe(product => {
			console.log(product);
			this.messeageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
			setTimeout(() => {
				this.router.navigateByUrl('admin/products/view');
			}, 500)
		}, err => {
			this.messeageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
		});
		
	}
}

