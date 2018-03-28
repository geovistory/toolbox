import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSetComponent } from './property.component';

describe('RoleSetComponent', () => {
  let component: RoleSetComponent;
  let fixture: ComponentFixture<RoleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
