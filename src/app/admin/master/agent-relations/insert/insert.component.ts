import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startDate:NgbDateStruct;
  endDate:NgbDateStruct;

  walahDalah() {
  	let str:string = `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`;
  	console.log(str);
  }

}
