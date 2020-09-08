import { Injectable } from '@angular/core';
import { AgentRelations } from 'src/app/model/agent-relations';
import { Accounts } from 'src/app/model/accounts';
import { Subject, BehaviorSubject, Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { debounce, debounceTime, switchMap, tap, delay } from 'rxjs/operators';

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
export class AgentRelationsService {

  accountTemp: Accounts = new Accounts();
  agentRelations: AgentRelations[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _agentRelations$ = new BehaviorSubject<AgentRelations[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  }

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.viewAgentRelation();
  }

  async viewAgentRelation() {
    this.apiService.viewAgentRelation().subscribe(data => {
      console.log(data);
      this.agentRelations = data;
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

  matches(agentR: AgentRelations, term: string) {
    return agentR.idAgent.name.toLowerCase().includes(term.toLowerCase());
    // dan lain-lain
  }

  get agentRelations$() { return this._agentRelations$.asObservable(); }
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
    let agentRelations = this.agentRelations;
    agentRelations = agentRelations.filter(agentR => this.matches(agentR, searchTerm,));
    const total = agentRelations.length;

    // 2. paginate
    agentRelations = agentRelations.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({agentRelations, total});
  }
}
