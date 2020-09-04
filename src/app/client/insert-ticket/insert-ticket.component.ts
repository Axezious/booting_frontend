import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-insert-ticket',
  templateUrl: './insert-ticket.component.html',
  styleUrls: ['./insert-ticket.component.scss']
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
  products: Products[];
  priorities: Priorities[];
  classifications: Classifications[];
  productSelected: string;
  prioritySelected: string;
  classificationSelected: string;
  status: Status[];


  uploadFiles() {
    console.log(this.fileList);
    let thread = new Thread();
    thread.id = '123'; // Ganti dengan no ticket.
    thread.contents = this.itemValue;
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

  constructor(private auth: AuthService, private apiService: ApiService, private fire: FireService) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.ticketDtl.idTickets = new Tickets();
    this.ticketDtl.idTickets.idCustomer = new Users();
    this.ticketDtl.idTickets.idStatus = new Status();
    this.account = this.auth.getAccount();
    
    apiService.viewProducts().subscribe( datas => {
      console.log(datas)
      this.products = datas;
      this.productSelected = this.products[0].id
    })

    apiService.viewPriorities().subscribe( datas => {
      console.log(datas)
      this.priorities = datas;
      this.prioritySelected = this.priorities[0].id
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

    // this.uploadFiles();
    console.log(this.ticketDtl.idTickets);
    this.apiService.insertTicket(this.ticketDtl.idTickets).subscribe( data => {
      console.log(data);
    })
    this.ticketDtl.idTickets.idCustomer = this.account.idUser;
    this.uploadFiles();
    console.log(this.ticketDtl); 
  }
}
