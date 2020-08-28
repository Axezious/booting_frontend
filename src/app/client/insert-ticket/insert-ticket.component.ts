import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { QuillEditorComponent, EditorChangeContent, EditorChangeSelection } from "ngx-quill";
import Quill from 'quill'
import { Accounts } from 'src/app/model/accounts';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { Companies } from 'src/app/model/companies';
import { Tickets } from 'src/app/model/tickets';
import { Users } from 'src/app/model/users';
import { Products } from 'src/app/model/products';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
})
export class InsertTicketComponent implements OnInit {
  @ViewChild('attachments', { static: false }) attachment: any;

  files: File[] = []
  blurred = false
  focused = false
  account: Accounts = new Accounts();
  ticketDtl: TicketsDtl = new TicketsDtl();
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];


  uploadFiles() {
    console.log(this.fileList);
    this.attachment.nativeElement.value = '';
    this.fileList = []
    this.listOfFiles = []
  }
  onFileChanged(event: any) {
    let totalSize = 0;
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
    }
    for (let i = 0; i <= this.fileList.length - 1; i++) {
      totalSize += this.fileList[i].size

    }
    console.log(totalSize);
    let mat = Math.floor(totalSize / 1024)
    if (mat > 1000) {
      let total1;
      total1 = Math.floor(mat / 1024)
      console.log(total1 + "mb");
    }
    else {
      console.log(mat + " kb");
    }
  }
  removeSelectedFile(index) {

    // Delete the item from fileNames list
    this.listOfFiles.splice(index, 1);
    // delete file from FileList
    this.fileList.splice(index, 1);
  }





  public editorContent
  editor: string

  constructor(private auth: AuthService) {
    this.account = this.auth.getAccount();
    console.log(this.account);
  }

  ngOnInit() {

  }

  readQuill() {
    console.log(this.editorContent);
  }

  changedEditor(editorQuill: EditorChangeContent) {
    this.editor = editorQuill.html
    console.log(this.editor);
  }

  submit() {

  }
}
