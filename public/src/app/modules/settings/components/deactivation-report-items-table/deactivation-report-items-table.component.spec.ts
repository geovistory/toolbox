import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivationReportItemsTableComponent } from './deactivation-report-items-table.component';

describe('DeactivationReportItemsTableComponent', () => {
  let component: DeactivationReportItemsTableComponent;
  let fixture: ComponentFixture<DeactivationReportItemsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivationReportItemsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivationReportItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
