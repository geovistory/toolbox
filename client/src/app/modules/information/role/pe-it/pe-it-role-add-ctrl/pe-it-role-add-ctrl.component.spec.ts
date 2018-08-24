import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleAddCtrlComponent } from './pe-it-role-add-ctrl.component';

describe('PeItRoleAddCtrlComponent', () => {
  let component: PeItRoleAddCtrlComponent;
  let fixture: ComponentFixture<PeItRoleAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
