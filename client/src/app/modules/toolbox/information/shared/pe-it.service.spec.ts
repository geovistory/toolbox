import { TestBed, inject } from '@angular/core/testing';

import { PeItService } from './pe-it.service';

describe('PeItService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeItService]
    });
  });

  it('should be created', inject([PeItService], (service: PeItService) => {
    expect(service).toBeTruthy();
  }));
});
