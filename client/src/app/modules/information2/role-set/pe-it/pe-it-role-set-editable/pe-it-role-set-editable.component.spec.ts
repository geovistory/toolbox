import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItRoleSetEditableComponent } from './pe-it-role-set-editable.component';

describe('PeItRoleSetEditableComponent', () => {
  let component: PeItRoleSetEditableComponent;
  let fixture: ComponentFixture<PeItRoleSetEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItRoleSetEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItRoleSetEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
