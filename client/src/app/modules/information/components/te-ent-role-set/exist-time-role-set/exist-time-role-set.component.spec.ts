import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistTimeRoleSetComponent } from './exist-time-role-set.component';

describe('ExistTimeRoleSetComponent', () => {
  let component: ExistTimeRoleSetComponent;
  let fixture: ComponentFixture<ExistTimeRoleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistTimeRoleSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistTimeRoleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
