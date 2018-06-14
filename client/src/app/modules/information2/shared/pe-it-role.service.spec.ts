import { TestBed, inject } from '@angular/core/testing';

import { PeItRoleService } from './pe-it-role.service';

describe('PeItRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeItRoleService]
    });
  });

  it('should be created', inject([PeItRoleService], (service: PeItRoleService) => {
    expect(service).toBeTruthy();
  }));
});
