import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleCreateCtrlComponent } from './te-ent-role-create-ctrl.component';

describe('TeEntRoleCreateCtrlComponent', () => {
  let component: TeEntRoleCreateCtrlComponent;
  let fixture: ComponentFixture<TeEntRoleCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
