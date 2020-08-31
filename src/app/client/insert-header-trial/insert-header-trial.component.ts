import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-insert-header-trial',
  templateUrl: './insert-header-trial.component.html',
  styleUrls: ['./insert-header-trial.component.scss']
})
export class InsertHeaderTrialComponent implements OnInit {

  itemVal = '';
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase) { 
    this.items = db.list('itms').valueChanges();
  }

  ngOnInit() {
  }

  onSub() {
    this.db.list('itms').push({content: this.itemVal});
    this.itemVal = '';
  }
}
