import { TestBed, inject } from '@angular/core/testing';

import { TeEntService } from './te-ent.service';

describe('TeEntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeEntService]
    });
  });

  it('should be created', inject([TeEntService], (service: TeEntService) => {
    expect(service).toBeTruthy();
  }));
});
