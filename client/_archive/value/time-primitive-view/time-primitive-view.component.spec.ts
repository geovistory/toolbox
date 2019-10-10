import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePrimitiveViewComponent } from './time-primitive-view.component';

describe('TimePrimitiveViewComponent', () => {
  let component: TimePrimitiveViewComponent;
  let fixture: ComponentFixture<TimePrimitiveViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePrimitiveViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePrimitiveViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
