import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/service/master/status.service';
import { ApiService } from 'src/app/service/api.service';
import { Status } from 'src/app/model/status';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-status-view',
  templateUrl: './status-view.component.html',
  styleUrls: ['./status-view.component.scss'],
  providers: [
    StatusService
  ]
})
export class StatusViewComponent implements OnInit {

  status$: Observable<Status[]>;
  total$: Observable<number>;

  constructor(private service: StatusService, private apiService: ApiService) {
    this.status$ = service.status$;
    this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deleteStatus(status: Status) {
    this.apiService.deleteStatus(status).subscribe(status => {
      console.log(status);
      this.service.viewStatus();
    })
  }

}
