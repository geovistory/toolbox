import { TestBed } from '@angular/core/testing';

import { ShouldPauseService } from './should-pause.service';

describe('ShouldPauseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShouldPauseService = TestBed.get(ShouldPauseService);
    expect(service).toBeTruthy();
  });
});
