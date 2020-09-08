import { TestBed } from '@angular/core/testing';

import { AdminPermitService } from './admin-permit.service';

describe('AdminPermitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPermitService = TestBed.get(AdminPermitService);
    expect(service).toBeTruthy();
  });
});
