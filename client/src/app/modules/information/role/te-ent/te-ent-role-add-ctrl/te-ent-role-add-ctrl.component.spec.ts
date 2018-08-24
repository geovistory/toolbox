import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleAddCtrlComponent } from './te-ent-role-add-ctrl.component';

describe('TeEntRoleAddCtrlComponent', () => {
  let component: TeEntRoleAddCtrlComponent;
  let fixture: ComponentFixture<TeEntRoleAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
