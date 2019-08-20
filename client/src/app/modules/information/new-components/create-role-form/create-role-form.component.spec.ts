import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoleFormComponent } from './create-role-form.component';

describe('CreateRoleFormComponent', () => {
  let component: CreateRoleFormComponent;
  let fixture: ComponentFixture<CreateRoleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRoleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
