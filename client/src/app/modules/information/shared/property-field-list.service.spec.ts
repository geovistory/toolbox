import { TestBed, inject } from '@angular/core/testing';

import { PropertyFieldListService } from './property-field-list.service';

describe('PropertyFieldListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyFieldListService]
    });
  });

  it('should be created', inject([PropertyFieldListService], (service: PropertyFieldListService) => {
    expect(service).toBeTruthy();
  }));
});
