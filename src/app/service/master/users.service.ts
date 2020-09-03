import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Users} from '../../model/users';
import {Roles} from '../../model/roles';
import {ApiService} from '../api.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

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

export class UsersService {
  
  users: Users[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<Users[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
  };

  constructor(private apiService: ApiService) {
    this.viewUsers();
    
  }

  async viewUsers() {
    this.apiService.viewUsers().subscribe(users => {
      console.log(users);
      this.users = users;

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result1 => {
      this._users$.next(result1.users);
      this._total$.next(result1.total);
    });

    this._search$.next();
    })
  }

  matches(user: Users, term: string) {
  return user.nip.toLowerCase().includes(term.toLowerCase())
    || user.name.toLowerCase().includes(term.toLowerCase())
    || user.idCompany.name.toLowerCase().includes(term.toLowerCase())
    || user.idRole.name.toLowerCase().includes(term.toLowerCase())
    || user.contact.toLowerCase().includes(term.toLowerCase())
    || user.address.toLowerCase().includes(term.toLowerCase());
  }

  get users$() { return this._users$.asObservable(); }
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
    let users = this.users;
    users = users.filter(user => this.matches(user, searchTerm,));
    const total = users.length;

    // 2. paginate
    users = users.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({users, total});
  }


}

