import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsInsertComponent } from './products-insert/products-insert.component';
import { ProductsUpdateComponent } from './products-update/products-update.component';
import { ProductViewComponent } from './products-view/products-view.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [
  { path: 'insert', component: ProductsInsertComponent },
  { path: 'update', component: ProductsUpdateComponent },
  { path: 'view', component: ProductViewComponent },
]

@NgModule({
  declarations: [ProductsInsertComponent, ProductsUpdateComponent, ProductViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastModule,
    CheckboxModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule { }
