import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusInsertComponent } from './status-insert.component';

describe('StatusInsertComponent', () => {
  let component: StatusInsertComponent;
  let fixture: ComponentFixture<StatusInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
