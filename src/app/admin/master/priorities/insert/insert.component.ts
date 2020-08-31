import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Priorities } from '../../../../model/priorities';
import { Users } from '../../../../model/users';
import { Companies } from '../../../../model/companies';
import { Accounts } from '../../../../model/accounts';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  priorities:Priorities;

  constructor(private apiService:ApiService, private authService:AuthService) { 
  	this.priorities = new Priorities();
    console.log('walah dalah ini insert')
  }

  ngOnInit() {
  }

  async insertPriorities() {
  	this.priorities.createdBy = this.authService.getAccount().idUser.name;
  	this.apiService.insertPriorities(this.priorities).subscribe(priorities => {
  		console.log(priorities);
  	})
  }

}
