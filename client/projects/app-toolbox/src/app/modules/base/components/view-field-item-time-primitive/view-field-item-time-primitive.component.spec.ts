import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemTimePrimitiveComponent } from './view-field-item-time-primitive.component';

describe('ViewFieldItemTimePrimitiveComponent', () => {
  let component: ViewFieldItemTimePrimitiveComponent;
  let fixture: ComponentFixture<ViewFieldItemTimePrimitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemTimePrimitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemTimePrimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
