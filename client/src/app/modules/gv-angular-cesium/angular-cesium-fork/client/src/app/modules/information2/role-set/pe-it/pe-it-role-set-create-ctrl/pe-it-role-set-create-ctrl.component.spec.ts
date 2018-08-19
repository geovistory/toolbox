import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleSetCreateCtrlComponent } from './pe-it-role-set-create-ctrl.component';

describe('PeItRoleSetCreateCtrlComponent', () => {
  let component: PeItRoleSetCreateCtrlComponent;
  let fixture: ComponentFixture<PeItRoleSetCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleSetCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleSetCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
