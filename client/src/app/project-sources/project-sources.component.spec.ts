import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSourcesComponent } from './project-sources.component';

describe('ProjectSourcesComponent', () => {
  let component: ProjectSourcesComponent;
  let fixture: ComponentFixture<ProjectSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
