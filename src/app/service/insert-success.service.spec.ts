import { TestBed } from '@angular/core/testing';

import { InsertSuccessService } from './insert-success.service';

describe('InsertSuccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertSuccessService = TestBed.get(InsertSuccessService);
    expect(service).toBeTruthy();
  });
});
