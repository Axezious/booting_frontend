import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {Priorities} from '../../model/priorities';
import {ApiService} from '../api.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
// import {SortColumn, SortDirection} from './sortable.directive';

interface SearchResult {
  priorities: Priorities[];
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

export class PrioritiesService {
  
  priorities: Priorities[] = [
    // {
    //   id:'1',
    //   code:'code 1',
    //   name:'name 1',
    //   createdBy: 'admin 1',
    //   updatedBy: 'admin 1'
    // },
    // {
    //   id:'2',
    //   code:'code 2',
    //   name:'name 2',
    //   createdBy: 'admin 1',
    //   updatedBy: 'admin 1'
    // },
    // {
    //   id:'3',
    //   code:'code 3',
    //   name:'name 3',
    //   createdBy: 'admin 1',
    //   updatedBy: 'admin 1'
    // }
  ];
  updatePriority:Priorities = new Priorities();

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _priorities$ = new BehaviorSubject<Priorities[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    // sortColumn: '',
    // sortDirection: ''
  };

  constructor(private apiService: ApiService) {

    // this.updatePriority = new Priorities();
    this.viewPriorities();

  }

  async viewPriorities() {

    this.apiService.viewPriorities().subscribe(priorities => {
      console.log(priorities);
      this.priorities = priorities;

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._priorities$.next(result.priorities);
      this._total$.next(result.total);
    });

    this._search$.next();

    })
  }

  matches(priority: Priorities, term: string) {
  return priority.code.toLowerCase().includes(term.toLowerCase())
    || priority.name.toLowerCase().includes(term.toLowerCase());
    // || pipe.transform(priority.population).includes(term);
  }

  get priorities$() { return this._priorities$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get getUpdatePriority():Priorities { return this.updatePriority; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set setUpdatePriority(priority:Priorities) { this.updatePriority = priority; }
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
    let priorities = this.priorities;
    priorities = priorities.filter(priority => this.matches(priority, searchTerm));
    const total = priorities.length;

    // 3. paginate
    priorities = priorities.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({priorities, total});
  }


}

