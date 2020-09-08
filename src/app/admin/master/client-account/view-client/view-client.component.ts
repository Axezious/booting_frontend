import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users';
import { ClientService } from 'src/app/service/master/client.service';
import { ApiService } from 'src/app/service/api.service';
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { Companies } from 'src/app/model/companies';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  users$:Observable<Users[]>;
  total$:Observable<number>;

  constructor(private service:ClientService, private apiService:ApiService, private authService:AuthService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
    
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();
  }

  ngOnInit() {
  }

  // async deleteUser(user:Users) {
  //   this.
  // }

}
