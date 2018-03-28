import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSetListComponent } from './prop-section-list.component';

describe('RoleSetListComponent', () => {
  let component: RoleSetListComponent;
  let fixture: ComponentFixture<RoleSetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleSetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleSetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
