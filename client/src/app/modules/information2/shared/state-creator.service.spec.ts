import { TestBed, inject } from '@angular/core/testing';

import { StateCreatorService } from './state-creator.service';

describe('StateCreatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateCreatorService]
    });
  });

  it('should be created', inject([StateCreatorService], (service: StateCreatorService) => {
    expect(service).toBeTruthy();
  }));
});
