import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EditorChangeContent } from "ngx-quill";
import { Accounts } from 'src/app/model/accounts';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { AuthService } from 'src/app/service/auth.service';
import { Users } from 'src/app/model/users';
import { Companies } from 'src/app/model/companies';
import { Roles } from 'src/app/model/roles';
import { Tickets } from 'src/app/model/tickets';


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
  itemValue = '';


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

  constructor(private auth: AuthService) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.ticketDtl.idTickets = new Tickets();
    this.ticketDtl.idTickets.idCustomer = new Users();
    this.account = this.auth.getAccount();
  }

  ngOnInit() {

  }

  submit() {
    this.ticketDtl.idTickets.idCustomer = this.account.idUser;
    this.uploadFiles();
    console.log(this.ticketDtl);
    
  }
}
