import { TestBed } from '@angular/core/testing';
import { WorkerWrapperService } from './worker-wrapper.service';


describe('WorkerWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkerWrapperService = TestBed.inject(WorkerWrapperService);
    expect(service).toBeTruthy();
  });
});
