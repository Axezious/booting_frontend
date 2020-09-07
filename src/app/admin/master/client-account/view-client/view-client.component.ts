import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from 'src/app/model/users';
import { ClientService } from 'src/app/service/master/client.service';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.scss']
})
export class ViewClientComponent implements OnInit {

  // users$:Observable<Users[]>;
  // total$:Observable<number>;

  constructor(private service:ClientService, private apiService:ApiService) {
    // this.users$ = service.users$;
    // this.total$ = service.total$;
  }

  ngOnInit() {
  }

  // async deleteUser(user:Users) {
  //   this.
  // }

}
