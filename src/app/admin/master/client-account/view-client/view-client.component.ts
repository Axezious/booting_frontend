import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users';
import { ClientService } from 'src/app/service/master/client.service';
import { ApiService } from 'src/app/service/api.service';
import { MessageService } from 'primeng/api';
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { Companies } from 'src/app/model/companies';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss'],
  providers: [
    ClientService, MessageService
  ]
})
export class ViewClientComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  users$:Observable<Users[]>;
  total$:Observable<number>;
  selectedDel:Users[] = [];

  constructor(private service:ClientService, private apiService:ApiService, 
              private authService:AuthService, private messageService:MessageService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
    
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();
  }

  ngOnInit() {
  }

  deleteAll() {
    console.log(this.selectedDel);
    for (let i = 0; i < this.selectedDel.length; i++ ) {
      this.apiService.deleteCompanies(this.selectedDel[i]).subscribe(company =>{
      console.log(company);
      this.messageService.add({ key: 'tc', severity: 'info', summary: 'Info', detail: 'Delete Data Success ' });
      this.service.viewClient();
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
