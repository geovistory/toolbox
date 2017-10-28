import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEntitiesComponent } from './project-entities.component';

describe('ProjectEntitiesComponent', () => {
  let component: ProjectEntitiesComponent;
  let fixture: ComponentFixture<ProjectEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
