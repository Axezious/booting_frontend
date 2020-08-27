import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Accounts} from '../../model/accounts';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
// import {SortColumn, SortDirection} from './sortable.directive';

interface SearchResult {
  accounts: Accounts[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  // sortColumn: SortColumn;
  // sortDirection: SortDirection;
}

@Injectable({
  providedIn: 'root'
})

export class AccountsService {

  ACCOUNTS: Accounts[] = [
  {
    id: '1',
    email: 'email 1',
    pass: 'password 1',
    idUser: null
    
  },
  {
    id: '2',
    email: 'email 2',
    pass: 'password 2',
    idUser: null
  },
  {
    id: '3',
    email: 'email 3',
    pass: 'password 3',
    idUser: null
  },
  {
    id: '4',
    email: 'email 4',
    pass: 'password 4',
    idUser: null
  },
  {
    id: '5',
    email: 'email 5',
    pass: 'password 5',
    idUser: null
  },
  {
    id: '6',
    email: 'email 6',
    pass: 'password 6',
    idUser: null
  },
  {
    id: '7',
    email: 'email 7',
    pass: 'password 7',
    idUser: null
  },
  {
    id: '8',
    email: 'email 8',
    pass: 'password 8',
    idUser: null
  },
  {
    id: '9',
    email: 'email 9',
    pass: 'password 9',
    idUser: null
  },
  {
    id: '10',
    email: 'email 10',
    pass: 'password 10',
    idUser: null
  },
  {
    id: '11',
    email: 'email 11',
    pass: 'password 11',
    idUser: null
  },
  {
    id: '12',
    email: 'email 12',
    pass: 'password 12',
    idUser: null
  },
  {
    id: '13',
    email: 'email 13',
    pass: 'password 13',
    idUser: null
  }
];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _accounts$ = new BehaviorSubject<Accounts[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    // sortColumn: '',
    // sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._accounts$.next(result.accounts);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  matches(account: Accounts, term: string, pipe: PipeTransform) {
  return account.email.toLowerCase().includes(term.toLowerCase())
    || account.pass.toLowerCase().includes(term.toLowerCase());
    // || pipe.transform(account.population).includes(term);
  }

  get accounts$() { return this._accounts$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  // set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  // set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {/*sortColumn, sortDirection,*/ pageSize, page, searchTerm} = this._state;

    // 1. sort
    // let countries = sort(COUNTRIES, sortColumn, sortDirection);

    // 2. filter
    let accounts = this.ACCOUNTS;
    accounts = accounts.filter(account => this.matches(account, searchTerm, this.pipe));
    const total = accounts.length;

    // 3. paginate
    accounts = accounts.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({accounts, total});
  }
}



// const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

// function sort(countries: Country[], column: SortColumn, direction: string): Country[] {
//   if (direction === '' || column === '') {
//     return countries;
//   } else {
//     return [...countries].sort((a, b) => {
//       const res = compare(a[column], b[column]);
//       return direction === 'asc' ? res : -res;
//     });
//   }
// }

// function matches(country: Country, term: string, pipe: PipeTransform) {
//   return country.name.toLowerCase().includes(term.toLowerCase())
//     || pipe.transform(country.area).includes(term)
//     || pipe.transform(country.population).includes(term);
// }

// export class CountryService {
  
// }