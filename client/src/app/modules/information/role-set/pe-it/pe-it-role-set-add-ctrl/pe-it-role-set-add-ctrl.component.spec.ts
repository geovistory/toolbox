import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleSetAddCtrlComponent } from './pe-it-role-set-add-ctrl.component';

describe('PeItRoleSetAddCtrlComponent', () => {
  let component: PeItRoleSetAddCtrlComponent;
  let fixture: ComponentFixture<PeItRoleSetAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleSetAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleSetAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
