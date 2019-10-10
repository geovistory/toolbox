import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPropertyFieldComponent } from './text-property-field.component';

describe('TextPropertyFieldComponent', () => {
  let component: TextPropertyFieldComponent;
  let fixture: ComponentFixture<TextPropertyFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPropertyFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPropertyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
