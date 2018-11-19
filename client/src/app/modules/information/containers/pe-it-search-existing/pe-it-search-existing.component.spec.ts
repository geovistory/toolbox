import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItSearchExistingComponent } from './pe-it-search-existing.component';

describe('PeItSearchExistingComponent', () => {
  let component: PeItSearchExistingComponent;
  let fixture: ComponentFixture<PeItSearchExistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItSearchExistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItSearchExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
