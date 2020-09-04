import { TestBed } from '@angular/core/testing';

import { ListTicketService } from './list-ticket.service';

describe('ListTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListTicketService = TestBed.get(ListTicketService);
    expect(service).toBeTruthy();
  });
});
