import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfilesListComponent } from './ontome-profiles-list.component';

describe('OntomeProfilesListComponent', () => {
  let component: OntomeProfilesListComponent;
  let fixture: ComponentFixture<OntomeProfilesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfilesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
