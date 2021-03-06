import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';
import { Products } from '../../../../model/products';
import { MessageService } from 'primeng/api';
import { RefreshProfileService } from 'src/app/service/refresh-profile.service';
import { UpdateSuccessService } from 'src/app/service/update-success.service';

@Component({
	selector: 'app-products-update',
	templateUrl: './products-update.component.html',
	styleUrls: ['./products-update.component.scss'],
	providers: [MessageService]
})
export class ProductsUpdateComponent implements OnInit {

	product: Products;
	temp: Products;
	validasi = 0;

	constructor(private apiService: ApiService, private authService: AuthService,
		private activatedRoute: ActivatedRoute, private messeageService: MessageService,
		private router: Router, private refresh: RefreshProfileService, private updateToast: UpdateSuccessService) {
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
		if (this.product.code == null || this.product.code == undefined || this.product.code == '') {
			return this.validasi = 1;
		}
		else {
			this.product.id = this.temp.id;
			this.product.createdBy = this.temp.createdBy;
			this.product.updatedBy = this.authService.getAccount().idUser.name;
			console.log(this.product);
			this.apiService.updateProducts(this.product).subscribe(product => {
				console.log(product);
				this.updateToast.callUpdateToast();
				this.router.navigateByUrl('admin/products/view');
			}, err => {
				this.messeageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'The code was already exist.Please try another one!' });
			});
		}


	}
}

