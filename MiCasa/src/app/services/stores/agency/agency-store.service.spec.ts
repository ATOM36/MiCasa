import { TestBed } from '@angular/core/testing';

import { AgencyStoreService } from './agency-store.service';

describe('AgencyStoreService', () => {
  let service: AgencyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
