import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartContFormGroupComponent } from './time-chart-cont-form-group.component';

describe('TimeChartContFormGroupComponent', () => {
  let component: TimeChartContFormGroupComponent;
  let fixture: ComponentFixture<TimeChartContFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeChartContFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartContFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
