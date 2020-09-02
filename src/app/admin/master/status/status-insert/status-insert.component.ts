import { Component, OnInit } from '@angular/core';
import { Status } from 'src/app/model/status';
import { ApiService } from 'src/app/service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-status-insert',
  templateUrl: './status-insert.component.html',
  styleUrls: ['./status-insert.component.scss']
})
export class StatusInsertComponent implements OnInit {

  status: Status;

  constructor(private apiService: ApiService, private authService: AuthService) {
    this.status = new Status();
  }

  ngOnInit() {
  }

  async insertStatus() {
    this.status.createdBy = this.authService.getAccount().idUser.name;
    this.apiService.insertStatus(this.status).subscribe(status => {
      console.log(status);
    })
  }
}
