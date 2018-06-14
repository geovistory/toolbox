import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleSetFormComponent } from './te-ent-role-set-form.component';

describe('TeEntRoleSetFormComponent', () => {
  let component: TeEntRoleSetFormComponent;
  let fixture: ComponentFixture<TeEntRoleSetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleSetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
