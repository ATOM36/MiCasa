import { TestBed } from '@angular/core/testing';

import { ClientContractsService } from './client-contracts.service';

describe('ClientContractsService', () => {
  let service: ClientContractsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientContractsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
