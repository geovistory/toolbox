import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleSetFormComponent } from './pe-it-role-set-form.component';

describe('PeItRoleSetFormComponent', () => {
  let component: PeItRoleSetFormComponent;
  let fixture: ComponentFixture<PeItRoleSetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleSetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleSetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
