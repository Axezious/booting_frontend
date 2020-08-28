import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LoginComponent } from 'src/app/user-pages/login/login.component';
import { Tickets } from 'src/app/model/tickets';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { Status } from 'src/app/model/status';
import { Priorities } from 'src/app/model/priorities';
import { QuillModule } from 'ngx-quill'

@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
})


export class InsertTicketComponent implements OnInit {
  insertTickeT = []
  ticketM = new Tickets();
  ticketDtl = new TicketsDtl();
  constructor(private elem: ElementRef) {
    this.insertTickeT = []
    this.ticketDtl = new TicketsDtl();
    this.ticketM = new Tickets();
  }
  @ViewChild('attachments', { static: false }) attachment: any;
  files: File[] = []
  upload(event) {
    const multiFile = (event.target as HTMLInputElement).files;
    for (let index = 0; index < multiFile.length; index++) {
      this.files.push(multiFile[index]);
    }
  }

  uploadFiles() {
    console.log(this.fileList);
    console.log(this.insertTickeT);
    this.attachment.nativeElement.value = '';
    this.fileList = []
    this.listOfFiles = []
  }

  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];

  onFileChanged(event: any) {
    let totalSize = 0;
    for (let i = 0; i <= event.target.files.length - 1; i++) {
      var selectedFile = event.target.files[i];
      this.fileList.push(selectedFile);
      this.listOfFiles.push(selectedFile.name)
    }
    this.insertTickeT.push(this.ticketM)
    for (let i = 0; i <= this.fileList.length - 1; i++) {
      totalSize += this.fileList[i].size
      
    }
    console.log(totalSize);
    let mat = Math.floor(totalSize/1024)
    if (mat > 1000) {
      let total1;
      total1 = Math.floor(mat /1024) 
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

  removeAllFiles() {
    this.files = [];
  }
  public editorContent



  ngOnInit() {
  }

  readQuill() {
    console.log(this.editorContent);
  }
}
