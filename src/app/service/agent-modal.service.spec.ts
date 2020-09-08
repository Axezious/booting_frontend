import { TestBed } from '@angular/core/testing';

import { AgentModalService } from './agent-modal.service';

describe('AgentModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentModalService = TestBed.get(AgentModalService);
    expect(service).toBeTruthy();
  });
});
