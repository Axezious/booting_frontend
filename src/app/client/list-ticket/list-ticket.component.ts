import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../service/api.service';

import { Tickets } from '../../model/tickets';
import { ListTicketsService } from '../../service/list-ticket.service';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.scss'],
  providers: [
    ListTicketsService
  ]
})
export class ListTicketComponent implements OnInit {

  tickets$:Observable<Tickets[]>;
  ticketsOpen$:Observable<Tickets[]>;
  total$:Observable<number>;

  constructor(private apiService:ApiService, private service:ListTicketsService) { 
  	this.tickets$ = service.tickets$;
    this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async getListTicket() {
  	this.apiService.getListTicket().subscribe(result => {
  		console.log(result);
  	})
  }

  getOpenTickets() {
    this.service.openFilter();
  }

  getCloseTickets() {

  }

  getReopenTickets() {

  }

}
