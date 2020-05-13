import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartContFormArrayComponent } from './time-chart-cont-form-array.component';

describe('TimeChartContFormArrayComponent', () => {
  let component: TimeChartContFormArrayComponent;
  let fixture: ComponentFixture<TimeChartContFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeChartContFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartContFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
