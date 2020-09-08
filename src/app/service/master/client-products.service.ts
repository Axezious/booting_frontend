import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ClientProducts } from "../../model/client-products";
import { ApiService } from "../api.service";
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Companies } from 'src/app/model/companies';

interface SearchResult {
  clientProducts: ClientProducts[];
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

export class ClientProductsService {

  clientProducts: ClientProducts[] = []

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _clientProducts$ = new BehaviorSubject<ClientProducts[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewClientProducts();
  }

  async viewClientProducts() {
    this.apiService.viewClientProduct().subscribe(clientProduct => {
      console.log(clientProduct);
      this.clientProducts = clientProduct;

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._clientProducts$.next(result.clientProducts);
        this._total$.next(result.total);
      });
      this._search$.next();
    })
  }

  matches(clientProduct: ClientProducts, term: string) {
    return clientProduct.idCompany.name.toLowerCase().includes(term.toLowerCase())
     || clientProduct.idProduct.name.toLowerCase().includes(term.toLowerCase());
    //  || classification.name.toLowerCase().includes(term.toLowerCase());
  }

  get clientProducts$() { return this._clientProducts$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;

    // 1. filter
    let clientProducts = this.clientProducts;
    clientProducts = clientProducts.filter(clientProducts => this.matches(clientProducts, searchTerm,));
    const total = clientProducts.length;

    // 2. paginate
    clientProducts = clientProducts.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ clientProducts, total });
  }

}
