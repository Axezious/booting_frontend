import { Component, OnInit, ElementRef } from '@angular/core';
import { QuillEditorComponent, EditorChangeContent, EditorChangeSelection } from "ngx-quill";
import Quill from 'quill'
import { Accounts } from 'src/app/model/accounts';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { Companies } from 'src/app/model/companies';
import { Tickets } from 'src/app/model/tickets';
import { Users } from 'src/app/model/users';
import { Products } from 'src/app/model/products';

@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
})
export class InsertTicketComponent implements OnInit {
  files: File[] = []
  blurred = false
  focused = false
  account: Accounts = new Accounts();
  ticketDtl: TicketsDtl = new TicketsDtl();

  upload(event) {
    const multiFile = (event.target as HTMLInputElement).files;
    for (let index = 0; index < multiFile.length; index++) {
      this.files.push(multiFile[index]);
    }
  }

  uploadFiles() {
    console.log(this.files);
  }
  public editorContent
  editor : string

  constructor(private elem: ElementRef) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.ticketDtl.idTickets = new Tickets();
    this.ticketDtl.idTickets.idProduct = new Products();
  }

  ngOnInit() {
  }

  readQuill() {
    console.log(this.editorContent);
  }

  changedEditor(editorQuill: EditorChangeContent ) {    
    this.editor = editorQuill.html
    console.log(this.editor);
  }
  
}
