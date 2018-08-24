import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTimeRoleSetEditableComponent } from './ex-time-role-set-editable.component';

describe('ExTimeRoleSetEditableComponent', () => {
  let component: ExTimeRoleSetEditableComponent;
  let fixture: ComponentFixture<ExTimeRoleSetEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExTimeRoleSetEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExTimeRoleSetEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
