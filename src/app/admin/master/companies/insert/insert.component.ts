import { Component, OnInit } from '@angular/core';
import { Companies } from '../../../../model/companies';
import { ApiService } from '../../../../service/api.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent implements OnInit {

  companies : Companies;

  constructor(private apiService: ApiService) { 
    this.companies = new Companies();
  }

  ngOnInit() {
  }

  async insertCompanies() {
    this.apiService.insertCompanies(this.companies).subscribe(companies => {
      console.log(companies);
    })
  }
}
