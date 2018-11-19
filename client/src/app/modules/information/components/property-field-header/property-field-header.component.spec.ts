import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFieldHeaderComponent } from './property-field-header.component';

describe('PropertyFieldHeaderComponent', () => {
  let component: PropertyFieldHeaderComponent;
  let fixture: ComponentFixture<PropertyFieldHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyFieldHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFieldHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
