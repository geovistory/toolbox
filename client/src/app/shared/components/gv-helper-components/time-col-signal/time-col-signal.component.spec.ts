import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeColSignalComponent } from './time-col-signal.component';

describe('TimeColSignalComponent', () => {
  let component: TimeColSignalComponent;
  let fixture: ComponentFixture<TimeColSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeColSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeColSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
