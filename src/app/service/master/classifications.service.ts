import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Classifications } from '../../model/classifications';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  classifications: Classifications[];
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

export class ClassificationsService {

  classifications: Classifications[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _classifications$ = new BehaviorSubject<Classifications[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService, private authService:AuthService) {
    this.viewClassifications();

  }

  async viewClassifications() {

    this.apiService.viewClassifications().subscribe(classifications => {
      console.log(classifications);
      this.classifications = classifications;

      this._search$.pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      ).subscribe(result => {
        this._classifications$.next(result.classifications);
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

  get classifications$() { return this._classifications$.asObservable(); }
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
    let classifications = this.classifications;
    classifications = classifications.filter(classification => this.matches(classification, searchTerm,));
    const total = classifications.length;

    // 2. paginate
    classifications = classifications.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ classifications, total });
  }


}

