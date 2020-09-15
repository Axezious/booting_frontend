import { TestBed } from '@angular/core/testing';

import { RefreshProfileService } from './refresh-profile.service';

describe('RefreshProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefreshProfileService = TestBed.get(RefreshProfileService);
    expect(service).toBeTruthy();
  });
});
