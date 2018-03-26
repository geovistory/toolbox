import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditPanelComponent } from './project-edit-panel.component';

describe('ProjectEditPanelComponent', () => {
  let component: ProjectEditPanelComponent;
  let fixture: ComponentFixture<ProjectEditPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
