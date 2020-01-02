import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsCollaboratorsComponent } from './project-settings-collaborators.component';

describe('ProjectSettingsCollaboratorsComponent', () => {
  let component: ProjectSettingsCollaboratorsComponent;
  let fixture: ComponentFixture<ProjectSettingsCollaboratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingsCollaboratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
