import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertHeaderTrialComponent } from './insert-header-trial.component';

describe('InsertHeaderTrialComponent', () => {
  let component: InsertHeaderTrialComponent;
  let fixture: ComponentFixture<InsertHeaderTrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertHeaderTrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertHeaderTrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
