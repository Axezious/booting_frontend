import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Tickets } from '../model/tickets';
import { Accounts } from '../model/accounts';
import { Users } from '../model/users';
import { Companies } from '../model/companies';
import { Roles } from '../model/roles';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

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

  account: Accounts = new Accounts();
  tickets: Tickets[] = [];
  ticketsFilter: Tickets[] = [];
  ticketsOpen: Tickets[] = [];
  ticketsClose: Tickets[] = [];
  ticketsReopen: Tickets[] = [];

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _tickets$ = new BehaviorSubject<Tickets[]>([]);
  private _ticketsFilter$ = new BehaviorSubject<Tickets[]>([]);
  private _ticketsOpen$ = new BehaviorSubject<Tickets[]>([]);
  private _ticketsClose$ = new BehaviorSubject<Tickets[]>([]);
  private _ticketsReopen$ = new BehaviorSubject<Tickets[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: ''
  };

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.account = authService.getAccount();

    let role = this.account.idUser.idRole.code;
    let company = this.account.idUser.idCompany.name;
    let nip = this.account.idUser.nip;

    if (role == 'ADM' || role == 'SPA') {
      this.viewTickets();
    }

    if (role == 'AGT') {
      this.viewTicketsByAgent(nip);
    }

    if (role == 'CLI') {
      this.viewTicketsByCompany(company);
    }

    if (role == 'CTM') {
      this.viewTicketsByCustomer(nip);
    }

  }

  async viewTickets() {

    this.apiService.getListTicket().subscribe(tickets => {
      this.tickets = tickets;
      this.dataInit(this.tickets);

    })
  }

  async viewTicketsByAgent(nip: string) {
    this.apiService.getListTicketByAgent(nip).subscribe(tickets => {
      this.tickets = tickets;
      this.dataInit(this.tickets);

    })
  }

  async viewTicketsByCompany(name: string) {
    this.apiService.getListTicketByCompany(name).subscribe(tickets => {
      this.tickets = tickets;
      this.dataInit(this.tickets);

    })
  }

  async viewTicketsByCustomer(nip: string) {
    this.apiService.getListTicketByCustomer(nip).subscribe(tickets => {
      this.tickets = tickets;
      this.dataInit(this.tickets);

    })
  }

  allFilter() {
    this.dataInit(this.tickets);
  }

  openFilter() {
    this.ticketsFilter = this.tickets.filter(data => data.idStatus.name == 'Open');
    this.dataInit(this.ticketsFilter);
  }

  closeFilter() {
    this.ticketsFilter = this.tickets.filter(data => data.idStatus.name == 'Close');
    this.dataInit(this.ticketsFilter);
  }

  reopenFilter() {
    this.ticketsFilter = this.tickets.filter(data => data.idStatus.name == 'Re-open');
    this.dataInit(this.ticketsFilter);
  }

  dataInit(data) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search(data)),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tickets$.next(result.tickets);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

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
  get ticketsFilter$() { return this._tickets$.asObservable(); }
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

  private _search(data): Observable<SearchResult> {
    const { pageSize, page, searchTerm } = this._state;

    // 1. filter
    let tickets = data;
    tickets = tickets.filter(ticket => this.matches(ticket, searchTerm));
    const total = tickets.length;

    // 2. paginate
    tickets = tickets.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ tickets, total });
  }


}

