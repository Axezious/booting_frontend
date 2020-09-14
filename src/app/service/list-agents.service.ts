import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { AgentRelations } from '../model/agent-relations';
import { ApiService } from './api.service';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  agentRelations: AgentRelations[];
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

  agentRelations: AgentRelations[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _agentRelations$ = new BehaviorSubject<AgentRelations[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewAgentRelations();
    
  }

  async viewAgentRelations() {

    this.apiService.viewAgentRelation().subscribe(agentRelations => {
      console.log(agentRelations);
      this.agentRelations = agentRelations;

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._agentRelations$.next(result.agentRelations);
      this._total$.next(result.total);
    });

    this._search$.next();

    })
  }

  matches(agentRelation: AgentRelations, term: string) {
    if (agentRelation.idAgent != null && agentRelation.idCompany != null){
      return agentRelation.idAgent.name.toLowerCase().includes(term.toLowerCase())
        || agentRelation.idCompany.name.toLowerCase().includes(term.toLowerCase());    
    }  
  
  }

  get agentRelations$() { return this._agentRelations$.asObservable(); }
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
    let agentRelations = this.agentRelations;
    agentRelations = agentRelations.filter(agentRelation => this.matches(agentRelation, searchTerm,));
    const total = agentRelations.length;

    // 2. paginate
    agentRelations = agentRelations.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({agentRelations, total});
  }

}
