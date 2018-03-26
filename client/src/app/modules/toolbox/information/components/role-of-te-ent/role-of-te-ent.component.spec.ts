import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOfTeEntComponent } from './role-of-te-ent.component';

describe('RoleOfTeEntComponent', () => {
  let component: RoleOfTeEntComponent;
  let fixture: ComponentFixture<RoleOfTeEntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOfTeEntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOfTeEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
