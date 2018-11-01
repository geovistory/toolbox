import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntPropertyFieldAddCtrlComponent } from './te-ent-role-set-add-ctrl.component';

describe('TeEntRoleSetAddCtrlComponent', () => {
  let component: TeEntPropertyFieldAddCtrlComponent;
  let fixture: ComponentFixture<TeEntPropertyFieldAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntPropertyFieldAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntPropertyFieldAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
