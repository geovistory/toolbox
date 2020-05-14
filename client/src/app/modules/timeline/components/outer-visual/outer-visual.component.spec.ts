import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterVisualComponent } from './outer-visual.component';

describe('OuterVisualComponent', () => {
  let component: OuterVisualComponent;
  let fixture: ComponentFixture<OuterVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
