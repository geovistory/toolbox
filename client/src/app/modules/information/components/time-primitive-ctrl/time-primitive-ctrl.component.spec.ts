import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePrimitiveCtrlComponent } from './time-primitive-ctrl.component';

describe('TimePrimitiveCtrlComponent', () => {
  let component: TimePrimitiveCtrlComponent;
  let fixture: ComponentFixture<TimePrimitiveCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePrimitiveCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePrimitiveCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
