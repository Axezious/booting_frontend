import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';

import { AgentModal } from '../model/agent-modal';
import { ApiService } from './api.service';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
  agentModal: AgentModal[];
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
export class AgentModalService {

  agentModals: AgentModal[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _agentModals$ = new BehaviorSubject<AgentModal[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService, private pipe: DecimalPipe) {
	this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._agentModals$.next(result.agentModal);
      this._total$.next(result.total);
    });

    this._search$.next();    
    
  }

  async viewAgentModal(id:string) {

    this.apiService.getAgentModal(id).subscribe(agentModals => {
      console.log(agentModals);
      this.agentModals = agentModals;

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._agentModals$.next(result.agentModal);
      this._total$.next(result.total);
    });

    this._search$.next();

    })
  }

  matches(agentModal: AgentModal, term: string, pipe: PipeTransform) {
  return agentModal.agent.toLowerCase().includes(term.toLowerCase())
  	|| agentModal.company.toLowerCase().includes(term.toLowerCase())
  	|| agentModal.customer.toLowerCase().includes(term.toLowerCase())
  	|| pipe.transform(agentModal.total).includes(term)
  	|| pipe.transform(agentModal.open).includes(term)
  	|| pipe.transform(agentModal.close).includes(term)
  	|| pipe.transform(agentModal.reopen).includes(term);
  }

  get agentModals$() { return this._agentModals$.asObservable(); }
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
    let agentModal = this.agentModals;
    agentModal = agentModal.filter(agentModal => this.matches(agentModal, searchTerm, this.pipe));
    const total = agentModal.length;

    // 2. paginate
    agentModal = agentModal.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({agentModal, total});
  }
}
