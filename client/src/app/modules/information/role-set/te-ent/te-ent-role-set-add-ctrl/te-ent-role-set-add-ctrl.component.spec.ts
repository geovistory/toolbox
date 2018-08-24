import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleSetAddCtrlComponent } from './te-ent-role-set-add-ctrl.component';

describe('TeEntRoleSetAddCtrlComponent', () => {
  let component: TeEntRoleSetAddCtrlComponent;
  let fixture: ComponentFixture<TeEntRoleSetAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleSetAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleSetAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
