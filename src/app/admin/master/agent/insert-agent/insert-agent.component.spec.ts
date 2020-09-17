import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertAgentComponent } from './insert-agent.component';

describe('InsertAgentComponent', () => {
  let component: InsertAgentComponent;
  let fixture: ComponentFixture<InsertAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
