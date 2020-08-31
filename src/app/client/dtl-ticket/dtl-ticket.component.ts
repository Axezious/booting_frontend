import { Component, OnInit } from '@angular/core';
import { TicketsDtl } from 'src/app/model/tickets-dtl';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Accounts } from 'src/app/model/accounts';
import { Users } from 'src/app/model/users';
import { Companies } from 'src/app/model/companies';
import { Roles } from 'src/app/model/roles';

@Component({
  selector: 'app-dtl-ticket',
  templateUrl: './dtl-ticket.component.html',
  styleUrls: ['./dtl-ticket.component.scss']
})

export class DtlTicketComponent implements OnInit {
  account: Accounts = new Accounts();
  ticketDtl: TicketsDtl = new TicketsDtl();
  
  itemValue = '';
  items: Observable<any[]>;


  constructor(public db: AngularFireDatabase, private auth: AuthService) {
    this.account.idUser = new Users();
    this.account.idUser.idCompany = new Companies();
    this.account.idUser.idRole = new Roles();
    this.account = auth.getAccount();

    this.items = db.list('items').valueChanges();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.db.list('items').push({issues: this.itemValue});
    this.itemValue = '';
  }
}
