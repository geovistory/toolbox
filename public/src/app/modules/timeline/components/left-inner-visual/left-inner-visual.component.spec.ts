import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftInnerVisualComponent } from './left-inner-visual.component';

describe('LeftInnerVisualComponent', () => {
  let component: LeftInnerVisualComponent;
  let fixture: ComponentFixture<LeftInnerVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftInnerVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftInnerVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
