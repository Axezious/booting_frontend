import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../../service/api.service';
import { AuthService } from '../../../../service/auth.service';

import { Classifications } from '../../../../model/classifications';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  classification:Classifications;	

  constructor(private apiService:ApiService, private authService:AuthService) { 
  	this.classification = new Classifications();
  }

  ngOnInit() {
  }

  async insertClassification() {
  	this.classification.createdBy = this.authService.getAccount().idUser.name;
  	this.apiService.insertClassifications(this.classification).subscribe(classification =>{
  		console.log(classification);
  	})
  }

}
