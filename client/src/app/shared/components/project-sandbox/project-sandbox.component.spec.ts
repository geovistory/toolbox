import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSandboxComponent } from './project-sandbox.component';

describe('ProjectSandboxComponent', () => {
  let component: ProjectSandboxComponent;
  let fixture: ComponentFixture<ProjectSandboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSandboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
