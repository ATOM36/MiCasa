import { TestBed } from '@angular/core/testing';

import { AgenceSignalRService } from './agence-signal.service';

describe('SignalRService', () => {
  let service: AgenceSignalRService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenceSignalRService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
