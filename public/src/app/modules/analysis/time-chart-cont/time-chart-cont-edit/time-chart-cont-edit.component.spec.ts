import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeChartContEditComponent } from './time-chart-cont-edit.component';

describe('AnalysisBuilderTimeContComponent', () => {
  let component: TimeChartContEditComponent;
  let fixture: ComponentFixture<TimeChartContEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeChartContEditComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeChartContEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
