import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntPropertyFieldCreateCtrlComponent } from './te-ent-role-set-create-ctrl.component';

describe('TeEntRoleSetCreateCtrlComponent', () => {
  let component: TeEntPropertyFieldCreateCtrlComponent;
  let fixture: ComponentFixture<TeEntPropertyFieldCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntPropertyFieldCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntPropertyFieldCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
