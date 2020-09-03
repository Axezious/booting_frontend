import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Classifications } from '../../model/classifications';
import { ApiService } from '../api.service';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { Status } from '../../../app/model/status'






interface SearchResult {
  status: Status[];
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
export class StatusService {

  status: Status[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _status$ = new BehaviorSubject<Status[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewStatus();
  }

  async viewStatus() {

    this.apiService.viewStatus().subscribe(status => {
      console.log(status);
      this.status = status;

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._status$.next(result.status);
        this._total$.next(result.total);
      });

      this._search$.next();

    })
  }

  matches(classification: Classifications, term: string) {
    return classification.code.toLowerCase().includes(term.toLowerCase())
      || classification.name.toLowerCase().includes(term.toLowerCase());
    //  || classification.name.toLowerCase().includes(term.toLowerCase());
  }

  get status$() { return this._status$.asObservable(); }
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
    let status = this.status;
    status = status.filter(statuss => this.matches(statuss, searchTerm,));
    const total = status.length;

    // 2. paginate
    status = status.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ status, total });
  }

}
