import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
})
export class InsertTicketComponent implements OnInit {

  public editorContent 

  constructor(private elem: ElementRef) { }

  ngOnInit() {
  }

  readQuill() {
    console.log(this.editorContent);
  }
  
  

}
