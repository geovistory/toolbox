import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleComponent } from './pe-it-role.component';

describe('PeItRoleComponent', () => {
  let component: PeItRoleComponent;
  let fixture: ComponentFixture<PeItRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
