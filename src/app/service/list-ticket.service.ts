import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import { Tickets } from '../model/tickets';
import { ApiService } from './api.service';

import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  tickets: Tickets[];
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

export class ListTicketsService {
  
  tickets:Tickets[] = [];
  ticketsOpen:Tickets[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tickets$ = new BehaviorSubject<Tickets[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService) {
    this.viewTickets();
    
  }

  async viewTickets() {

    this.apiService.getListTicket().subscribe(tickets => {

      this.tickets = tickets;
      this.ticketsOpen = tickets.filter(data => data.idStatus.name == 'Open');

      this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tickets$.next(result.tickets);
      this._total$.next(result.total);
    });

    this._search$.next();

    })
  }

  openFilter() {
    this.tickets = this.tickets.filter(data => data.idStatus.name == 'Open');
  }

  // isOpen(element, index, array) {
  //   return element == 'Open';
  // }

  matches(ticket: Tickets, term: string) {
  if (ticket.idCustomer.name != null && ticket.code != null && ticket.subject != null && ticket.idStatus.name != null) {
    return ticket.idCustomer.name.toLowerCase().includes(term.toLowerCase())
    || ticket.code.toLowerCase().includes(term.toLowerCase())
    || ticket.subject.toLowerCase().includes(term.toLowerCase())
    || ticket.idStatus.name.toLowerCase().includes(term.toLowerCase());  
    // || ticket.address.toLowerCase().includes(term.toLowerCase())
   //  || ticket.name.toLowerCase().includes(term.toLowerCase());  
  }  
  
  }

  get tickets$() { return this._tickets$.asObservable(); }
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
    let tickets = this.tickets;
    tickets = tickets.filter(ticket => this.matches(ticket, searchTerm));
    const total = tickets.length;

    // 2. paginate
    tickets = tickets.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({tickets, total});
  }


}

