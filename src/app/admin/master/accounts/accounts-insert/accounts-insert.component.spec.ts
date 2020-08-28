import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsInsertComponent } from './accounts-insert.component';

describe('AccountsInsertComponent', () => {
  let component: AccountsInsertComponent;
  let fixture: ComponentFixture<AccountsInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
