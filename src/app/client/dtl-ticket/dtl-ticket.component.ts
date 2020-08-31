import { Component, OnInit } from '@angular/core';
import { Tickets } from 'src/app/model/tickets';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { ClientProducts } from 'src/app/model/client-products';
import { Products } from 'src/app/model/products';
import { Users } from 'src/app/model/users';
import { tick } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Optional, Self, Input, ViewChild } from '@angular/core';
import { NgControl, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
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

  itemValue = '';
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase) {
    this.ticket.idCustomer = this.user;
    this.ticket.idCustomer.name = 'Mamang Garox';
    this.ticket.idAgent = this.user;
    this.ticket.idAgent.name = 'Avogadro';
    this.ticket.idPriority = new Priorities();
    this.ticket.idPriority.name = 'Medium';
    this.ticket.subject = 'Subject Ticket';
    
    this.ticketDtl.idTickets = this.ticket;
    this.items = db.list('items').valueChanges();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.db.list('items').push({issues: this.itemValue});
    this.itemValue = '';
  }
}