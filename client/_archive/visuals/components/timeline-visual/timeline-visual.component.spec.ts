import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineVisualComponent } from './timeline-visual.component';

describe('TimelineVisualComponent', () => {
  let component: TimelineVisualComponent;
  let fixture: ComponentFixture<TimelineVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
