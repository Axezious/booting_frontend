import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Products } from '../../model/products';
import {ApiService} from '../api.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  products: Products[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  
  products: Products[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _products$ = new BehaviorSubject<Products[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewProducts();
    
  }

  async viewProducts() {

    this.apiService.viewProducts().subscribe(products => {
      console.log(products);
      this.products = products;

      for (let index = 0; index < this.products.length; index++) {
        if(this.products[index].active){
          this.products[index].active = 'Active'
        } else {
          this.products[index].active = 'Non-Active'
        }
      }

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._products$.next(result.products);
      this._total$.next(result.total);
    });

    this._search$.next();

    })
  }

  matches(product: Products, term: string) {
  return product.code.toLowerCase().includes(term.toLowerCase())
    || product.name.toLowerCase().includes(term.toLowerCase())
    || product.description.toLowerCase().includes(term.toLowerCase());
   //  || classification.name.toLowerCase().includes(term.toLowerCase());
  }

  get products$() { return this._products$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {pageSize, page, searchTerm} = this._state;

    // 1. filter
    let products = this.products;
    products = products.filter(product => this.matches(product, searchTerm,));
    const total = products.length;

    // 2. paginate
    products = products.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({products, total});
  }


}

