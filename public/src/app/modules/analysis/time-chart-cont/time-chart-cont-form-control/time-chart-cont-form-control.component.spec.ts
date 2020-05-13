import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartContFormControlComponent } from './time-chart-cont-form-control.component';

describe('TimeChartContFormControlComponent', () => {
  let component: TimeChartContFormControlComponent;
  let fixture: ComponentFixture<TimeChartContFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeChartContFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartContFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
