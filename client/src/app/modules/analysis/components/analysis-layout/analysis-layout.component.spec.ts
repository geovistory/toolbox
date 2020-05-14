import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisLayoutComponent } from './analysis-layout.component';

describe('AnalysisLayoutComponent', () => {
  let component: AnalysisLayoutComponent;
  let fixture: ComponentFixture<AnalysisLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
