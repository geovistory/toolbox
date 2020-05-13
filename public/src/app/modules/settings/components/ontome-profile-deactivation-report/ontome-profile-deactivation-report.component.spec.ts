import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfileDeactivationReportComponent } from './ontome-profile-deactivation-report.component';

describe('OntomeProfileDeactivationReportComponent', () => {
  let component: OntomeProfileDeactivationReportComponent;
  let fixture: ComponentFixture<OntomeProfileDeactivationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfileDeactivationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfileDeactivationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
