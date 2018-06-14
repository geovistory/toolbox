import { TestBed, inject } from '@angular/core/testing';

import { EprService } from './epr.service';

describe('EprService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EprService]
    });
  });

  it('should be created', inject([EprService], (service: EprService) => {
    expect(service).toBeTruthy();
  }));
});
