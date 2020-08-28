import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Roles} from '../../model/roles';
import {ApiService} from '../api.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  roles: Roles[];
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

export class RolesService {
  
  roles: Roles[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _roles$ = new BehaviorSubject<Roles[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
  };

  constructor(private apiService: ApiService) {
    this.viewRoles();
    
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._roles$.next(result.roles);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  async viewRoles() {

    this.apiService.viewRoles().subscribe(roles => {
      console.log(roles);
      this.roles = roles;
    })
  }

  matches(role: Roles, term: string) {
  return role.code.toLowerCase().includes(term.toLowerCase())
    || role.name.toLowerCase().includes(term.toLowerCase());
  }

  get roles$() { return this._roles$.asObservable(); }
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
    let roles = this.roles;
    roles = roles.filter(role => this.matches(role, searchTerm,));
    const total = roles.length;

    // 2. paginate
    roles = roles.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({roles, total});
  }


}

