import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OntomeProfileUpdateDialogComponent } from './ontome-profile-update-dialog.component';

describe('OntomeProfileUpdateDialogComponent', () => {
  let component: OntomeProfileUpdateDialogComponent;
  let fixture: ComponentFixture<OntomeProfileUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntomeProfileUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OntomeProfileUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
