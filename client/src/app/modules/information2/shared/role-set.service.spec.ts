import { TestBed, inject } from '@angular/core/testing';

import { RoleSetService } from './role-set.service';

describe('RoleSetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoleSetService]
    });
  });

  it('should be created', inject([RoleSetService], (service: RoleSetService) => {
    expect(service).toBeTruthy();
  }));
});
