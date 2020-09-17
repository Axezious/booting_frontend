import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Accounts } from 'src/app/model/accounts';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { AuthService } from 'src/app/service/auth.service';
import { Users } from 'src/app/model/users';
import { Companies } from 'src/app/model/companies';
import { Roles } from 'src/app/model/roles';
import { Tickets } from 'src/app/model/tickets';
import { ApiService } from 'src/app/service/api.service';
import { Products } from 'src/app/model/products';
import { Priorities } from 'src/app/model/priorities';
import { Classifications } from 'src/app/model/classifications';
import { Status } from 'src/app/model/status';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { Thread } from 'src/app/model/thread';
import { FireService } from 'src/app/service/fire.service';
import { async } from '@angular/core/testing';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ClientProducts } from 'src/app/model/client-products';


@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss'],
  providers:[MessageService]
  
})
export class InsertTicketComponent implements OnInit {
  @ViewChild('attachments', { static: false }) attachment: any;
  task: AngularFireUploadTask;
  files: File[] = []
  blurred = false
  focused = false
  account: Accounts = new Accounts();
  ticketDtl: TicketsDtl = new TicketsDtl();
  selectedFile: File;
  fileList: File[] = [];
  listOfFiles: any[] = [];
  itemValue = '';
  products: ClientProducts[];
  priorities: Priorities[];
  classifications: Classifications[];
  productSelected: string;
  prioritySelected: string;
  classificationSelected: string;
  status: Status[];
  readonly base_url = 'http://147.139.130.49:8080';
  codeTicket: string;
  
  uploadFiles(kode:string) {
    this.account = this.auth.getAccount();
    console.log(this.fileList);
    let thread = new Thread();
    let currentDate = new Date();

    thread.id = kode; // Ganti dengan no ticket.
    thread.contents = this.itemValue;
    thread.dateAndTime =  formatDate(currentDate, 'dd-MM-yyyy HH:mm:ss', 'en-US');
    thread.something = 'TEST ONLY';
    thread.user = new Users();
    thread.user.id = this.auth.getAccount().idUser.id;
    thread.user.name = this.auth.getAccount().idUser.name;
    if(this.account.idUser.idPhoto != null || this.account.idUser.idPhoto != undefined){
      thread.urlFoto = `${this.base_url}/photo/files/${this.account.idUser.idPhoto.id}`
      
    }

    this.fire.insertFireHdr(thread, this.fileList);
    this.attachment.nativeElement.value = '';
    this.fileList = []
    this.listOfFiles = []
    
  }
  onFileChanged(event: any) {
    console.log(event);
    let totalSize = 0;
    for (let i = 0; i < event.target.files.length; i++) {
      console.log(event.target);
      var selectedFile = event.target.files[i];
      console.log(selectedFile);
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

  fileLength: number;

  constructor(private auth: AuthService, private apiService: ApiService, private fire: FireService,private messageService:MessageService, private router:Router) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.ticketDtl.idTickets = new Tickets();
    this.ticketDtl.idTickets.idCustomer = new Users();
    this.ticketDtl.idTickets.idStatus = new Status();
    this.account = this.auth.getAccount();
    
    apiService.viewCLientProductByCompanyname(this.account.idUser.idCompany).subscribe( datas => {
      console.log(datas)
      console.log('client product');
      this.products = datas;
      this.productSelected = this.products[0].id
    })

    apiService.viewPriorities().subscribe( datas => {
      console.log(datas)
      this.priorities = datas;
      this.prioritySelected = this.priorities[0].code
    })

    apiService.viewClassifications().subscribe( datas => {
      console.log(datas);
      this.classifications = datas;
      this.classificationSelected = this.classifications[0].id
    })
    
    apiService.viewStatus().subscribe( datas => {
      console.log(datas);
      this.status = datas;
    })
  }

  ngOnInit() {

  }

  submit() {
    let product: Products = new Products();
    product.code = this.productSelected;
    this.ticketDtl.idTickets.idProduct = product;

    let priority: Priorities = new Priorities();
    priority.code = this.prioritySelected;
    this.ticketDtl.idTickets.idPriority = priority;

    let classification: Classifications = new Classifications();
    classification.code = this.classificationSelected;
    this.ticketDtl.idTickets.idClassification = classification;

    this.ticketDtl.sender = this.account.idUser.name;
    this.ticketDtl.description = this.itemValue;

    this.ticketDtl.idTickets.idStatus.code = 'OP';

    this.ticketDtl.idTickets.createdBy = this.account.idUser.name;

    this.ticketDtl.idTickets.idCustomer = this.account.idUser;
    this.ticketDtl.date = new Date();
    console.log(this.ticketDtl.date);
    

    // this.uploadFiles();
    console.log(this.ticketDtl.idTickets);
    this.apiService.insertTicket(this.ticketDtl.idTickets).subscribe( data => {
      console.log(data);
      this.ticketDtl.idTickets = data;
      this.ticketDtl.idTickets.idCustomer = this.account.idUser;
      this.uploadFiles(this.ticketDtl.idTickets.code);
      console.log(this.ticketDtl); 
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Transaksi Berhasil' });
      setTimeout(() => {
        this.router.navigateByUrl('client/list-ticket');
      }, 2000);
		}, err => {
			this.messageService.add({ key: 'tc', severity: 'error', summary: 'Info', detail: 'Transaksi Gagal' });
		});
  }
}
