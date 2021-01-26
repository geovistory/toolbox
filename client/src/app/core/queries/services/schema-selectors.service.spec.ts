import { TestBed } from '@angular/core/testing';

import { SchemaSelectorsService } from './schema-selectors.service';

describe('SchemaSelectorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchemaSelectorsService = TestBed.get(SchemaSelectorsService);
    expect(service).toBeTruthy();
  });
});
