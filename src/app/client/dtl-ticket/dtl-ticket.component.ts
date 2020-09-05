import { Component, OnInit, ViewChild } from '@angular/core';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { TicketHeader } from 'src/app/model/ticket-header';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-dtl-ticket',
  templateUrl: './dtl-ticket.component.html',
  styleUrls: ['./dtl-ticket.component.scss'],
})

export class DtlTicketComponent implements OnInit {
  @ViewChild('attachments', { static: false }) attachment: any;

  xCode: string;
  ticketHdr:TicketHeader = new TicketHeader();

  files: File[] = []
  account: Accounts = new Accounts();
  ticketDtl: TicketsDtl = new TicketsDtl();
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];

  itemValue = '';
  items: any[] = [];
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

  constructor(private auth: AuthService, private fire: FireService, private route: ActivatedRoute, public db: AngularFireDatabase, private api:ApiService) {
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
    this.ticketHdr.idAgent = new Users();

    this.getTicketByCode();

    db.list(`threads/XwCi-868`).query.orderByKey().on('child_added', data => {
      // console.log(data.val());
      this.items.push(data.val())
    })
  }

  ngOnInit() {
  }

  async getTicketByCode() {
    this.api.getTicketByCode(this.xCode).subscribe(result => {
      this.ticketHdr = result;

      console.log(this.ticketHdr);
    })
  }

  uploadFiles(kode: string) {
    console.log(this.fileList);
    let thread = new Thread();
    thread.id = 'XwCi-868'; // Ganti dengan no ticket.
    // thread.id = kode; // Ganti dengan no ticket.
    thread.contents = this.itemValue;
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
    thread.id = 'XwCi-868'; // Ganti ke nomor ticket.
    thread.contents = this.itemValue;

    // this.fire.insertFireDtl(thread, this.files);
    // this.itemValue = '';
    // console.log(thread.contents);
    this.threads.push(thread);
    // this.db.list('threads/slmb-541').push({contents: this.itemValue});

    this.uploadFiles(this.ticketDtl.idTickets.code);

  }
}
