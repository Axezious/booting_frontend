import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { TicketHeader } from 'src/app/model/ticket-header';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { ApiService } from 'src/app/service/api.service';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Status } from 'src/app/model/status';
import { Companies } from 'src/app/model/companies';
import { Priorities } from 'src/app/model/priorities';
import { Products } from 'src/app/model/products';
import { Roles } from 'src/app/model/roles';
import { formatDate } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Thread } from '../../model/thread';
import { FireService } from 'src/app/service/fire.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Tickets } from 'src/app/model/tickets';
import { tick } from '@angular/core/testing';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dtl-ticket',
  templateUrl: './dtl-ticket.component.html',
  styleUrls: ['./dtl-ticket.component.scss'],
  providers: [
    MessageService
  ]
})

export class DtlTicketComponent implements OnInit {
  @ViewChild('attachments', { static: false }) attachment: any;

  xCode: string;
  ticketHdr: TicketHeader = new TicketHeader();

  files: File[] = []
  account: Accounts = new Accounts();
  ticketDtl: TicketsDtl = new TicketsDtl();
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  readonly base_url = 'http://147.139.130.49:8080';
  itemValue = '';
  items: Observable<any[]>;
  threads: Thread[] = [];

  days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  currentDate = new Date();
  dayName = this.days[this.currentDate.getDay()];
  cValue = formatDate(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');

  imgSrc: string = '/';
  selectedImage: any = null;
  isSubmitted: boolean;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required)
  })
  labelCloseButton = ""

  constructor(private auth: AuthService, private fire: FireService, 
              private route: ActivatedRoute, public db: AngularFireDatabase, 
              private api: ApiService, private messageService:MessageService) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.account = auth.getAccount();
    this.ticketDtl.idTickets = new Tickets();
    this.xCode = this.route.snapshot.queryParamMap.get('code');
    this.ticketHdr.idTicket = new Tickets();
    this.ticketHdr.idTicket.idStatus = new Status();
    this.ticketHdr.idTicket.idPriority = new Priorities();
    this.ticketHdr.idTicket.idCustomer = new Users();
    this.ticketHdr.idTicket.idCustomer.idCompany = new Companies();
    this.ticketHdr.idTicket.idProduct = new Products();
    this.ticketHdr.idTicket.idStatus = new Status();
    this.ticketHdr.idAgent = new Users();
    
    this.getTicketByCode();

    // db.list(`threads/${this.xCode}`).query.orderByKey().on('child_added', data => {
    //   // console.log(data);
    //   // console.log(data.child('threads/MTeg-695/1').ref);
    //   // this.items.push(data.val());
    //   // console.log(data.val());
    // })

    this.items = db.list(`threads/${this.xCode}`).valueChanges()

    // db.list(`threads/${this.xCode}`).query.orderByKey().on('child_changed', data => {
    //   // this.items.push(data.val());
    //   this.items[this.items.length - 1] = data.val();
    //   // console.log(data.val());
    // })
  }

  ngOnInit() {
  }

   getTicketByCode() {
    this.api.getTicketByCode(this.xCode).subscribe(result => {
      this.ticketHdr = result;
      if(this.ticketHdr.idTicket.idStatus.code == 'OP'){
        this.labelCloseButton="Close Ticket"
      } else if(this.ticketHdr.idTicket.idStatus.code == 'CL'){
        this.labelCloseButton="Re-Open Ticket"
      } else if(this.ticketHdr.idTicket.idStatus.code == 'RO'){
        this.labelCloseButton="Close Ticket"
      }

      console.log(this.ticketHdr);
    })
  }

  uploadFiles(kode: string) {
    console.log(this.fileList);
    let thread = new Thread();
    // thread.id = 'XwCi-868'; // Ganti dengan no ticket.
    thread.id = this.xCode; // Ganti dengan no ticket.
    thread.contents = this.itemValue;
    thread.dateAndTime = formatDate(this.currentDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');
    thread.something = 'TEST DETAIL';
    thread.user = new Users();
    thread.user.id = this.auth.getAccount().idUser.id;
    thread.user.name = this.auth.getAccount().idUser.name;
    if(this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined){
      thread.urlFoto = `${this.base_url}/photo-profile/files/${this.account.idUser.idPhoto.id}`
    }
    this.fire.insertFireDtl(thread, this.fileList);
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

  onSubmit() {
    let thread = new Thread();
    // thread.id = 'XwCi-868'; // Ganti ke nomor ticket.
    thread.id = this.xCode; // Ganti ke nomor ticket.
    thread.contents = this.itemValue;

    // this.fire.insertFireDtl(thread, this.files);
    // this.itemValue = '';
    // console.log(thread.contents);
    this.threads.push(thread);
    // this.db.list('threads/slmb-541').push({contents: this.itemValue});

    this.uploadFiles(this.xCode);
    this.itemValue= ""
  }
  
  updateStatus(tickets : Tickets) {
    
    if(tickets.idStatus.code == 'OP'){
      tickets.idStatus.code = 'CL';
      this.ticketHdr.idTicket.idStatus.name = "Close"
      this.labelCloseButton = "Re-Open Ticket"
    } else if(tickets.idStatus.code == 'CL'){
      tickets.idStatus.code = 'RO'
      this.ticketHdr.idTicket.idStatus.name = "Re-Open"
      this.labelCloseButton = "Close Ticket"
    } else if(tickets.idStatus.code == 'RO'){
      tickets.idStatus.code = 'CL'
      this.ticketHdr.idTicket.idStatus.name = "Close"
      this.labelCloseButton = "Re-Open Ticket"
    }
    tickets.updatedBy = this.auth.getAccount().idUser.name
    // console.log(tickets);
    this.api.updateStatusTicket(tickets).subscribe(res => {
      console.log(res);
      this.messageService.clear('sc');
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Update Ticket\'s Status Success' });
    })
    
  }

  showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'sc', sticky: true, severity:'warn', summary:'Are you sure about this?', detail:'Confirm to proceed'});
    }

  onConfirm() {
        this.messageService.clear('sc');
  }

  onReject() {
      this.messageService.clear('sc');
  }
  
}
