import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCustomerComponent } from './insert-customer.component';

describe('InsertCustomerComponent', () => {
  let component: InsertCustomerComponent;
  let fixture: ComponentFixture<InsertCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
