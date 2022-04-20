import { TestBed } from '@angular/core/testing';

import { AgencyContractService } from './agency-contract.service';

describe('AgencyContractService', () => {
  let service: AgencyContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
