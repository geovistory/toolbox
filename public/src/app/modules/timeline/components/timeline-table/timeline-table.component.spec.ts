import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineTableComponent } from './timeline-table.component';

describe('TimelineTableComponent', () => {
  let component: TimelineTableComponent;
  let fixture: ComponentFixture<TimelineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
