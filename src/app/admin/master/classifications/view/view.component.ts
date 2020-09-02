import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../../../service/api.service';

import { Classifications } from '../../../../model/classifications';
import { ClassificationsService } from '../../../../service/master/classifications.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [
  	ClassificationsService
  ]
})
export class ViewComponent implements OnInit {

  classifications$:Observable<Classifications[]>;
  total$:Observable<number>;

  constructor(private service:ClassificationsService, private apiService:ApiService) { 
  	this.classifications$ = service.classifications$;
  	this.total$ = service.total$;
  }

  ngOnInit() {
  }

  async deleteClassification(classification:Classifications) {
    this.apiService.deleteClassifications(classification).subscribe(classification =>{
      console.log(classification);
      this.service.viewClassifications();
    })
  }
  
}
