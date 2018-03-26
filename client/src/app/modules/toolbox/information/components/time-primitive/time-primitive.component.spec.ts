import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePrimitiveComponent } from './time-primitive.component';

describe('TimePrimitiveComponent', () => {
  let component: TimePrimitiveComponent;
  let fixture: ComponentFixture<TimePrimitiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePrimitiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePrimitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
