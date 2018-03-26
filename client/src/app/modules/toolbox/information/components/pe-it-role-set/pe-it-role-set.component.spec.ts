import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleSetComponent } from './pe-it-role-set.component';

describe('PeItRoleSetComponent', () => {
  let component: PeItRoleSetComponent;
  let fixture: ComponentFixture<PeItRoleSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
