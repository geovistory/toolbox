import { TestBed } from '@angular/core/testing';

import { BService } from './b.service';

describe('BService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BService = TestBed.get(BService);
    expect(service).toBeTruthy();
  });
});
