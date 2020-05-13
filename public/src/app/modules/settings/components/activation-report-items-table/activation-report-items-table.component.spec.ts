import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationReportItemsTableComponent } from './activation-report-items-table.component';

describe('ActivationReportItemsTableComponent', () => {
  let component: ActivationReportItemsTableComponent;
  let fixture: ComponentFixture<ActivationReportItemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivationReportItemsTableComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationReportItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
