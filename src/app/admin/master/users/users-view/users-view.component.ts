import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';

import { Users } from '../../../../model/users';
import { UsersService } from '../../../../service/master/users.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  providers: [
    UsersService
  ]
})

export class UsersViewComponent implements OnInit {

  users$:Observable<Users[]>;
  total$:Observable<number>;

  constructor(private service: UsersService, private apiService:ApiService) {
    this.users$ = service.users$;
    this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deleteUser(user:Users) {
    this.apiService.deleteUsers(user).subscribe(user =>{
      console.log(user);
      this.service.viewUsers();
    })
  }

}
