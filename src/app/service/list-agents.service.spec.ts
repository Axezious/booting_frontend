import { TestBed } from '@angular/core/testing';

import { ListAgentsService } from './list-agents.service';

describe('ListAgentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListAgentsService = TestBed.get(ListAgentsService);
    expect(service).toBeTruthy();
  });
});
