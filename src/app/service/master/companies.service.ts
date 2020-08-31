import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Companies} from '../../model/companies';
import {ApiService} from '../api.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  companies: Companies[];
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

export class CompaniesService {
  
  companies: Companies[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _companies$ = new BehaviorSubject<Companies[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewCompanies();
    
    
  }

  async viewCompanies() {

    this.apiService.viewCompanies().subscribe(companies => {
      console.log(companies);
      this.companies = companies;

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._companies$.next(result.companies);
      this._total$.next(result.total);
    });

    this._search$.next();
    
    })
  }

  matches(company: Companies, term: string) {
  return company.name.toLowerCase().includes(term.toLowerCase());
  	// || company.address.toLowerCase().includes(term.toLowerCase())
   //  || company.name.toLowerCase().includes(term.toLowerCase());
  }

  get companies$() { return this._companies$.asObservable(); }
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
    let companies = this.companies;
    companies = companies.filter(company => this.matches(company, searchTerm,));
    const total = companies.length;

    // 2. paginate
    companies = companies.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({companies, total});
  }


}

