import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTimeRoleSetAddCtrlComponent } from './ex-time-role-set-add-ctrl.component';

describe('ExTimeRoleSetAddCtrlComponent', () => {
  let component: ExTimeRoleSetAddCtrlComponent;
  let fixture: ComponentFixture<ExTimeRoleSetAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExTimeRoleSetAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExTimeRoleSetAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
