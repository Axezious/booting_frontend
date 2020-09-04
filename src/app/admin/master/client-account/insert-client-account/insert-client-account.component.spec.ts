import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertClientAccountComponent } from './insert-client-account.component';

describe('InsertClientAccountComponent', () => {
  let component: InsertClientAccountComponent;
  let fixture: ComponentFixture<InsertClientAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertClientAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertClientAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
