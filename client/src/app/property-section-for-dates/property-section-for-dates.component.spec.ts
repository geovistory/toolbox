import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySectionForDatesComponent } from './property-section-for-dates.component';

describe('PropertySectionForDatesComponent', () => {
  let component: PropertySectionForDatesComponent;
  let fixture: ComponentFixture<PropertySectionForDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySectionForDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySectionForDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
