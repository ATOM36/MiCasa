import { TestBed } from '@angular/core/testing';

import { AgencyFireService } from './agency-fire.service';

describe('AgencyFireService', () => {
  let service: AgencyFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
