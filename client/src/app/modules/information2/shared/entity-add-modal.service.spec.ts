import { TestBed, inject } from '@angular/core/testing';

import { EntityAddModalService } from './entity-add-modal.service';

describe('EntityAddModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityAddModalService]
    });
  });

  it('should be created', inject([EntityAddModalService], (service: EntityAddModalService) => {
    expect(service).toBeTruthy();
  }));
});
