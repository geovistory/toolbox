import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleCreateCtrlComponent } from './pe-it-role-create-ctrl.component';

describe('PeItRoleCreateCtrlComponent', () => {
  let component: PeItRoleCreateCtrlComponent;
  let fixture: ComponentFixture<PeItRoleCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
