import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfileActivationReportComponent } from './ontome-profile-activation-report.component';

describe('OntomeProfileActivationReportComponent', () => {
  let component: OntomeProfileActivationReportComponent;
  let fixture: ComponentFixture<OntomeProfileActivationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfileActivationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfileActivationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
