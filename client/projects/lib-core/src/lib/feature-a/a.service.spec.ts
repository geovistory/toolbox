import { TestBed } from '@angular/core/testing';

import { AService } from './a.service';

describe('AService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AService = TestBed.get(AService);
    expect(service).toBeTruthy();
  });
});
