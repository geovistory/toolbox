import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleOfPeItComponent } from './role-of-pe-it.component';

describe('RoleOfPeItComponent', () => {
  let component: RoleOfPeItComponent;
  let fixture: ComponentFixture<RoleOfPeItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleOfPeItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleOfPeItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
