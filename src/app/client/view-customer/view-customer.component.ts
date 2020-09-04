import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/model/accounts';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  account$:Observable<Accounts>[];
  total$

  constructor() { }

  ngOnInit() {
  }

}
