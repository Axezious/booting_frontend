import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { Tickets } from '../../model/tickets';
import { ListTicketsService } from '../../service/list-ticket.service';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Roles } from 'src/app/model/roles';

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
  ticketsFilter$:Observable<Tickets[]>;
  total$:Observable<number>;
  role: string;
  accountTemp: Accounts = new Accounts();

  constructor(private apiService:ApiService, private service:ListTicketsService, private authService: AuthService) { 
  	this.tickets$ = service.tickets$;
    this.ticketsFilter$ = service.ticketsFilter$;
    this.total$ = service.total$;
    this.role = authService.getAccount().idUser.idRole.code;
  }

  ngOnInit() {
  }

  async getListTicket() {
  	this.apiService.getListTicket().subscribe(result => {
  		console.log(result);
  	})
  }

  beforeChange($event: NgbTabChangeEvent) {

    if ($event.nextId == 'idAll') {
       this.getAllTickets(); 
    }

    if ($event.nextId == 'idOpen') {
      this.getOpenTickets();
    }

    if ($event.nextId == 'idClose') {
      this.getCloseTickets();
    }

    if ($event.nextId == 'idReopen') {
      this.getReopenTickets();
    }
  }

  getAllTickets() {
    this.service.allFilter();
  }

  getOpenTickets() {
    this.service.openFilter();
  }

  getCloseTickets() {
    this.service.closeFilter();
  }

  getReopenTickets() {
    this.service.reopenFilter();
  }

}
