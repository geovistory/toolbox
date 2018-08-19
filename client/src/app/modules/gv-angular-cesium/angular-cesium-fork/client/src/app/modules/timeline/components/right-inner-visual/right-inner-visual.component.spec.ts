import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightInnerVisualComponent } from './right-inner-visual.component';

describe('RightInnerVisualComponent', () => {
  let component: RightInnerVisualComponent;
  let fixture: ComponentFixture<RightInnerVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightInnerVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightInnerVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
