import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleEditableComponent } from './te-ent-role-editable.component';

describe('TeEntRoleEditableComponent', () => {
  let component: TeEntRoleEditableComponent;
  let fixture: ComponentFixture<TeEntRoleEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
