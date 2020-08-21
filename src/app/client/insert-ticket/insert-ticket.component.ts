import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
})
export class InsertTicketComponent implements OnInit {

  constructor(private elem: ElementRef) { }

  ngOnInit() {
  }

}
