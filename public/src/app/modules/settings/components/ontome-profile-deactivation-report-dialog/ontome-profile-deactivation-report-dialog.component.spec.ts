import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfileDeactivationReportDialogComponent } from './ontome-profile-deactivation-report-dialog.component';

describe('OntomeProfileDeactivationReportDialogComponent', () => {
  let component: OntomeProfileDeactivationReportDialogComponent;
  let fixture: ComponentFixture<OntomeProfileDeactivationReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfileDeactivationReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfileDeactivationReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
