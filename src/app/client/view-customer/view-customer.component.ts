import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users';
import { CustomerService } from 'src/app/service/master/customer.service';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api'
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { Companies } from 'src/app/model/companies';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss'],
  providers: [
    CustomerService, MessageService
  ]
})
export class ViewCustomerComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  companyName: string;
  users$:Observable<Users[]>;
  total$:Observable<number>;
  selectedDel:Users[] = [];

  constructor(private service:CustomerService, private apiService:ApiService, 
              private authService:AuthService, private messageService:MessageService) {
    this.users$ = service.users$;
    this.total$ = service.total$;

    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();
    this.companyName = this.accountTemp.idUser.idCompany.name;
  }

  ngOnInit() {
  }

  async deleteCustomer(users:Users) {
    this.apiService.deleteUsers(users).subscribe(user => {
      console.log(user);
      this.service.viewCustomer(this.companyName);
    })
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteUsers(this.selectedDel[i]).subscribe(customer =>{
      console.log(customer);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Delete Data Success' });
      this.service.viewCustomer(this.companyName);
    }, err => {
      this.messageService.add({ key: 'tc', sticky: true, severity: 'error', summary: 'Info', detail: 'Delete Data Failed' });
    })
    }
  }

  showConfirm() {
        this.messageService.clear();
        this.messageService.add({key: 'sc', sticky: true, severity:'warn', summary:'Are you sure about this?', detail:'Confirm to proceed'});
    }

  onConfirm() {
        // this.deleteCompany(this.param);
        this.deleteAll();
        this.messageService.clear('sc');
        this.selectedDel = [];
    }

    onReject() {
        this.messageService.clear('sc');
    }

}
