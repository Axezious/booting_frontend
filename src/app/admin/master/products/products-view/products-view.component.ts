import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Product {
  id: string;
  code: string;
  name: string;
  descriptions: string;
}


const products : Product[] = [
  {
    id : 'id 1',
    name : 'Nama 1',
    code : 'Kode 1',
    descriptions : 'desc 1'
  },
  {
    id : 'id 2',
    name : 'Nama 2',
    code : 'Kode 2',
    descriptions : 'desc 2'
  }
];

function search(text: string, pipe: PipeTransform): Product[] {
  return products.filter(products => {
    const term = text.toLowerCase();
    return products.name.toLowerCase().includes(term)
        || products.code.includes(term)
        || products.descriptions.includes(term);
  });
}

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
  providers: [DecimalPipe]
})


export class ProductsViewComponent implements OnInit {

  products$: Observable<Product[]>;
  filter = new FormControl('');
  
  constructor(pipe: DecimalPipe) {
    this.products$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text, pipe))
    );
   }

  ngOnInit() {
  }

}
