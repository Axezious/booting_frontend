import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Companies } from 'src/app/model/companies';
import { Roles } from 'src/app/model/roles';
import { Accounts } from 'src/app/model/accounts';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  user: Users;
  userSend: Users;
  temp: Users;
  roles: Roles[] = [];
  companies: Companies[] = [];
  accountTemp: Accounts = new Accounts();


  constructor(private apiService: ApiService, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.user = new Users();
    this.user.idRole = new Roles();
    this.user.idCompany = new Companies();
    this.temp = new Users();
    this.getRoles();
    this.user.nip = activatedRoute.snapshot.queryParamMap.get('nip');
    this.accountTemp = authService.getAccount();
    
    console.log(this.user);
    
    this.getUserByNip(this.user.nip);
  }

  ngOnInit() {
  }

  async getRoles() {
    this.apiService.viewRoles().subscribe(roles => {
      this.roles = roles;
    })
  }

  async getUserByNip(nip: string) {
    this.apiService.getUserByNip(nip).subscribe(result => {
      console.log(result);
      this.user = result;
    })
  }

  async updateCustomer() {
    this.userSend = this.user;
    this.userSend.updatedBy = this.accountTemp.idUser.name;
    console.log(this.userSend);

    this.apiService.updateUsers(this.userSend).subscribe( data => {
      console.log(data);
    })
  }

}
