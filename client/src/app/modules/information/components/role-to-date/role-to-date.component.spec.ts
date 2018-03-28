import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleToDateComponent } from './role-to-date.component';

describe('RoleToDateComponent', () => {
  let component: RoleToDateComponent;
  let fixture: ComponentFixture<RoleToDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleToDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleToDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
