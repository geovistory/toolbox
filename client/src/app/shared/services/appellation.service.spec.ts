import { TestBed, inject } from '@angular/core/testing';

import { AppellationService } from './appellation.service';

describe('AppellationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppellationService]
    });
  });

  it('should be created', inject([AppellationService], (service: AppellationService) => {
    expect(service).toBeTruthy();
  }));
});
