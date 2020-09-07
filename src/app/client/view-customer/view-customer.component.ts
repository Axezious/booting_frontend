import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users';
import { CustomerService } from 'src/app/service/master/customer.service';
import { ApiService } from 'src/app/service/api.service';
import { Accounts } from 'src/app/model/accounts';
import { AuthService } from 'src/app/service/auth.service';
import { Companies } from 'src/app/model/companies';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  accountTemp: Accounts = new Accounts();
  companyName: string;
  users$:Observable<Users[]>;
  total$:Observable<number>;

  constructor(private service:CustomerService, private apiService:ApiService, private authService:AuthService) {
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

}
