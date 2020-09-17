import { TestBed } from '@angular/core/testing';

import { CustomerAdminSideService } from './customer-admin-side.service';

describe('CustomerAdminSideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerAdminSideService = TestBed.get(CustomerAdminSideService);
    expect(service).toBeTruthy();
  });
});
