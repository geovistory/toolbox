import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleEditableComponent } from './pe-it-role-editable.component';

describe('PeItRoleEditableComponent', () => {
  let component: PeItRoleEditableComponent;
  let fixture: ComponentFixture<PeItRoleEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
