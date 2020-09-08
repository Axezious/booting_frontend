import { TestBed } from '@angular/core/testing';

import { ClientProductsService } from './client-products.service';

describe('ClientProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientProductsService = TestBed.get(ClientProductsService);
    expect(service).toBeTruthy();
  });
});
