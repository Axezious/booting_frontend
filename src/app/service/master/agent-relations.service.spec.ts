import { TestBed } from '@angular/core/testing';

import { AgentRelationsService } from './agent-relations.service';

describe('AgentRelationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentRelationsService = TestBed.get(AgentRelationsService);
    expect(service).toBeTruthy();
  });
});
