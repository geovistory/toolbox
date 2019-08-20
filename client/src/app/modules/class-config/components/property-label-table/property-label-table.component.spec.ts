import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyLabelTableComponent } from './property-label-table.component';

describe('PropertyLabelTableComponent', () => {
  let component: PropertyLabelTableComponent;
  let fixture: ComponentFixture<PropertyLabelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyLabelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyLabelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
