import { TestBed } from '@angular/core/testing';

import { CesiumService } from './cesium.service';

describe('CesiumService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CesiumService = TestBed.get(CesiumService);
    expect(service).toBeTruthy();
  });
});
