import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTimePropertyFieldEditableComponent } from './ex-time-property-field-editable.component';

describe('ExTimePropertyFieldEditableComponent', () => {
  let component: ExTimePropertyFieldEditableComponent;
  let fixture: ComponentFixture<ExTimePropertyFieldEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExTimePropertyFieldEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExTimePropertyFieldEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
