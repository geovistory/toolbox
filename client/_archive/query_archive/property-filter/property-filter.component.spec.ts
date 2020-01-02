import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFilterComponent } from './property-filter.component';

describe('OperatorSelectComponent', () => {
  let component: PropertyFilterComponent;
  let fixture: ComponentFixture<PropertyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
