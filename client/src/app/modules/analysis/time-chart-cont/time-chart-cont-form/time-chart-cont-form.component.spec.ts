import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartContFormComponent } from './time-chart-cont-form.component';

describe('TimeChartContFormComponent', () => {
  let component: TimeChartContFormComponent;
  let fixture: ComponentFixture<TimeChartContFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeChartContFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartContFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
