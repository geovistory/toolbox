import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSetHeaderComponent } from './role-set-header.component';

describe('RoleSetHeaderComponent', () => {
  let component: RoleSetHeaderComponent;
  let fixture: ComponentFixture<RoleSetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
