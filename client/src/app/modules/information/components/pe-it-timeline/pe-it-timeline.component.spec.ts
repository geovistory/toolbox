import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItTimelineComponent } from './pe-it-timeline.component';

describe('PeItTimelineComponent', () => {
  let component: PeItTimelineComponent;
  let fixture: ComponentFixture<PeItTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
