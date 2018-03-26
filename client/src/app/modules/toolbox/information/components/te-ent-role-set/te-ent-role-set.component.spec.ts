import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeEntRoleSetComponent } from './te-ent-role-set.component';

describe('TeEntRoleSetComponent', () => {
  let component: TeEntRoleSetComponent;
  let fixture: ComponentFixture<TeEntRoleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeEntRoleSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeEntRoleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
