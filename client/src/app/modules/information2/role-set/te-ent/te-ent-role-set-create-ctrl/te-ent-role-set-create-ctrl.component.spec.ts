import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleSetCreateCtrlComponent } from './te-ent-role-set-create-ctrl.component';

describe('TeEntRoleSetCreateCtrlComponent', () => {
  let component: TeEntRoleSetCreateCtrlComponent;
  let fixture: ComponentFixture<TeEntRoleSetCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleSetCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleSetCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
