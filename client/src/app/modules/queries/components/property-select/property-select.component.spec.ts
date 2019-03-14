import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySelectComponent } from './property-select.component';

describe('PropertySelectComponent', () => {
  let component: PropertySelectComponent;
  let fixture: ComponentFixture<PropertySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
