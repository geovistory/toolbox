import { TestBed, inject } from '@angular/core/testing';

import { ActivePeItService } from './active-pe-it.service';

describe('ActivePeItService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivePeItService]
    });
  });

  it('should be created', inject([ActivePeItService], (service: ActivePeItService) => {
    expect(service).toBeTruthy();
  }));
});
