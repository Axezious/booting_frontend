import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRegistrasiComponent } from './email-registrasi.component';

describe('EmailRegistrasiComponent', () => {
  let component: EmailRegistrasiComponent;
  let fixture: ComponentFixture<EmailRegistrasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRegistrasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRegistrasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
