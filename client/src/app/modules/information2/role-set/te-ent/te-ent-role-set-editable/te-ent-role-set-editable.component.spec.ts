import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleSetEditableComponent } from './te-ent-role-set-editable.component';

describe('TeEntRoleSetEditableComponent', () => {
  let component: TeEntRoleSetEditableComponent;
  let fixture: ComponentFixture<TeEntRoleSetEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleSetEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleSetEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
