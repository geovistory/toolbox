import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntDetailComponent } from './te-ent-detail.component';

describe('TeEntEditableComponent', () => {
  let component: TeEntDetailComponent;
  let fixture: ComponentFixture<TeEntDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
