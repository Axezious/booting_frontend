import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface Country {
  name: string;
  area: number;
  population: number;
}

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  providers: [DecimalPipe]
})

export class UsersViewComponent implements OnInit {
  
  COUNTRIES: Country[] = [
  {
    name: 'Russia',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'Canada',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'United States',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'China',
    area: 9596960,
    population: 1409517397
  }
];

  countries$: Observable<Country[]>;
  filter = new FormControl('');

  page = 1;
  pageSize = 5;
  collectionSize = this.COUNTRIES.length;

  constructor(pipe: DecimalPipe) {
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  search(text: string, pipe: PipeTransform): Country[] {
	  return this.COUNTRIES.filter(country => {
	    const term = text.toLowerCase();
	    return country.name.toLowerCase().includes(term)
	        || pipe.transform(country.area).includes(term)
	        || pipe.transform(country.population).includes(term);
	  });
  }

 refreshCountries() {
    this.countries$ = this.COUNTRIES
      .map((country) => ({...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
 }

  ngOnInit() {
  }

}
