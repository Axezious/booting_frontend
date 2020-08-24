import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsInsertComponent } from './products-insert/products-insert.component';
import { ProductsUpdateComponent } from './products-update/products-update.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes :Routes = [
  {path : 'insert-products', component: ProductsInsertComponent},
  {path : 'update-products', component: ProductsUpdateComponent},
  {path : 'view-products', component: ProductsViewComponent},
]

@NgModule({
  declarations: [ProductsInsertComponent, ProductsUpdateComponent, ProductsViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, 
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
