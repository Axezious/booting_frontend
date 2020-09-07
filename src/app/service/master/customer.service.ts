import { Injectable } from '@angular/core';
import { Users } from 'src/app/model/users';
import { Accounts } from 'src/app/model/accounts';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { Companies } from 'src/app/model/companies';

interface SearchResult {
  users: Users[];
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
export class CustomerService {

  accountTemp: Accounts = new Accounts();
  users: Users[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<Users[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  }

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();
    let companyName = this.accountTemp.idUser.idCompany.name;
    this.viewCustomer(companyName);
  }

  async viewCustomer(data: string) {
    this.apiService.viewCustomer(data).subscribe(data => {
      console.log(data);
      this.users = data;

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });
      this._search$.next();
    })
  }

  matches(user: Users, term: string) {
    return user.name.toLowerCase().includes(term.toLowerCase());
    //dan lain lain
  }

  get users$() { return this._users$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() {return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm}
  
  set page(page: number) {this._set({page}); }
  set pageSize(pageSize: number) {this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {pageSize, page, searchTerm} = this._state;

    // 1. filter
    let users = this.users;
    users = users.filter(user => this.matches(user, searchTerm,));
    const total = users.length;

    // 2. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }
}
