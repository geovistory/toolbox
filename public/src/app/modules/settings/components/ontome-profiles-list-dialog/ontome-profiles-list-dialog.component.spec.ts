import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfilesListDialogComponent } from './ontome-profiles-list-dialog.component';

describe('OntomeProfilesListDialogComponent', () => {
  let component: OntomeProfilesListDialogComponent;
  let fixture: ComponentFixture<OntomeProfilesListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfilesListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfilesListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
