import { Component, OnInit } from '@angular/core';
import { Tickets } from 'src/app/model/tickets';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { ClientProducts } from 'src/app/model/client-products';
import { Products } from 'src/app/model/products';
import { Users } from 'src/app/model/users';
import { tick } from '@angular/core/testing';
import { Priorities } from 'src/app/model/priorities';

@Component({
  selector: 'app-dtl-ticket',
  templateUrl: './dtl-ticket.component.html',
  styleUrls: ['./dtl-ticket.component.scss']
})
export class DtlTicketComponent implements OnInit {

  ticket: Tickets = new Tickets();
  ticketDtl: TicketsDtl = new TicketsDtl();
  user: Users = new Users();
  product: Products = new Products();
  clientProduct: ClientProducts = new ClientProducts();

  constructor() {
    this.ticket.idCustomer = this.user;
    this.ticket.idCustomer.name = 'Mamang Garox';
    this.ticket.idAgent = this.user;
    this.ticket.idAgent.name = 'Avogadro';
    this.ticket.idPriority = new Priorities()
    this.ticket.idPriority.name = 'Medium';
    this.ticket.subject = 'Subject Ticket';

    this.ticketDtl.idTickets = this.ticket;
  }

  ngOnInit() {
  }

}
