import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DtlTicketComponent } from './dtl-ticket.component';

describe('DtlTicketComponent', () => {
  let component: DtlTicketComponent;
  let fixture: ComponentFixture<DtlTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DtlTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DtlTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
