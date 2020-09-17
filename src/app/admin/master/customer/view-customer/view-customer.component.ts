import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/model/accounts';
import { Companies } from 'src/app/model/companies';
import { Users } from 'src/app/model/users';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerAdminSideService } from 'src/app/service/master/customer-admin-side.service';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  users$:Observable<Users[]>;
  total$:Observable<number>;

  constructor(private service:CustomerAdminSideService, private apiService:ApiService, private authService:AuthService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
    
    this.accountTemp.idUser = new Users();
    this.accountTemp.idUser.idCompany = new Companies();
    this.accountTemp = authService.getAccount();
  }

  ngOnInit() {
  }

}
