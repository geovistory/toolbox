import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfilesSettingsComponent } from './ontome-profiles-settings.component';

describe('OntomeProfilesSettingsComponent', () => {
  let component: OntomeProfilesSettingsComponent;
  let fixture: ComponentFixture<OntomeProfilesSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfilesSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfilesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
