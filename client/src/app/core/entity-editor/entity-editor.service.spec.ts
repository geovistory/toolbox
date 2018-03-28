import { TestBed, inject } from '@angular/core/testing';

import { EntityEditorService } from './entity-editor.service';

describe('EntityEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntityEditorService]
    });
  });

  it('should be created', inject([EntityEditorService], (service: EntityEditorService) => {
    expect(service).toBeTruthy();
  }));
});
