import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfileActivationReportDialogComponent } from './ontome-profile-activation-report-dialog.component';

describe('OntomeProfileActivationReportDialogComponent', () => {
  let component: OntomeProfileActivationReportDialogComponent;
  let fixture: ComponentFixture<OntomeProfileActivationReportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfileActivationReportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfileActivationReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
