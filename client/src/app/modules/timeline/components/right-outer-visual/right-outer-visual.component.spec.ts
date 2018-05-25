import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightOuterVisualComponent } from './right-outer-visual.component';

describe('RightOuterVisualComponent', () => {
  let component: RightOuterVisualComponent;
  let fixture: ComponentFixture<RightOuterVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightOuterVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightOuterVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
