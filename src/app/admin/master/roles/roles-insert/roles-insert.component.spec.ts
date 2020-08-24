import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesInsertComponent } from './roles-insert.component';

describe('RolesInsertComponent', () => {
  let component: RolesInsertComponent;
  let fixture: ComponentFixture<RolesInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
