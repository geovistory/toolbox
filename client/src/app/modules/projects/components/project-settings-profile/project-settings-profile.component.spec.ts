import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsProfileComponent } from './project-settings-profile.component';

describe('ProjectSettingsProfileComponent', () => {
  let component: ProjectSettingsProfileComponent;
  let fixture: ComponentFixture<ProjectSettingsProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingsProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
