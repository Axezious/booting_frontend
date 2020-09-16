import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ApiService } from './api.service';

import { Users } from '../model/users';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  agents: Users[];
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
export class ListAgentsService {

  agents: Users[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _agents$ = new BehaviorSubject<Users[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewAgents();
    
  }

  async viewAgents() {

    this.apiService.viewAgent().subscribe(agents => {
      console.log(agents);
      this.agents = agents;

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._agents$.next(result.agents);
      this._total$.next(result.total);
    });

    this._search$.next();

    })
  }

  matches(agent: Users, term: string) {
    if (agent != null){
      return agent.name.toLowerCase().includes(term.toLowerCase())
        || agent.nip.toLowerCase().includes(term.toLowerCase());    
    }  
  
  }

  get agents$() { return this._agents$.asObservable(); }
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
    let agents = this.agents;
    agents = agents.filter(agent => this.matches(agent, searchTerm,));
    const total = agents.length;

    // 2. paginate
    agents = agents.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({agents, total});
  }

}
