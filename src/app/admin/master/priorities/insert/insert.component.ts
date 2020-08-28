import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../service/api.service';
import { Priorities } from '../../../../model/priorities';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  priorities:Priorities;

  constructor(private apiService:ApiService) { 
  	this.priorities = new Priorities();
  }

  ngOnInit() {
  }

  async insertPriorities() {
  	this.apiService.insertPriorities(this.priorities).subscribe(priorities => {
  		console.log(priorities);
  	})
  }

}
