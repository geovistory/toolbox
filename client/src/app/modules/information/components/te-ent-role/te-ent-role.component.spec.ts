import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleComponent } from './te-ent-role.component';

describe('TeEntRoleComponent', () => {
  let component: TeEntRoleComponent;
  let fixture: ComponentFixture<TeEntRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
