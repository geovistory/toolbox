import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftOuterVisualComponent } from './left-outer-visual.component';

describe('LeftOuterVisualComponent', () => {
  let component: LeftOuterVisualComponent;
  let fixture: ComponentFixture<LeftOuterVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftOuterVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftOuterVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
