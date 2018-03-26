import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSettingsDataComponent } from './project-settings-data.component';

describe('ProjectSettingsDataComponent', () => {
  let component: ProjectSettingsDataComponent;
  let fixture: ComponentFixture<ProjectSettingsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSettingsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSettingsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
