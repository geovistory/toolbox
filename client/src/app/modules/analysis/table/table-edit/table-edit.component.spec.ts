import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisBuilderTimeContComponent } from './table-edit.component';

describe('AnalysisBuilderTimeContComponent', () => {
  let component: AnalysisBuilderTimeContComponent;
  let fixture: ComponentFixture<AnalysisBuilderTimeContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisBuilderTimeContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisBuilderTimeContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
