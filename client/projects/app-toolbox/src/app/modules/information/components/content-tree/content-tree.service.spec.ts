import { TestBed } from '@angular/core/testing';
import { NgContentTreeService } from './content-tree.service';


describe('ContentTreeService', () => {
  let service: NgContentTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgContentTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
