import { TestBed } from '@angular/core/testing';

import { UpdateSuccessService } from './update-success.service';

describe('UpdateSuccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateSuccessService = TestBed.get(UpdateSuccessService);
    expect(service).toBeTruthy();
  });
});
