import { TestBed, inject } from '@angular/core/testing';

import { RoleSetListService } from './role-set-list.service';

describe('RoleSetListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleSetListService]
    });
  });

  it('should be created', inject([RoleSetListService], (service: RoleSetListService) => {
    expect(service).toBeTruthy();
  }));
});
