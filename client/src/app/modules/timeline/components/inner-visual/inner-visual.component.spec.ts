import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerVisualComponent } from './inner-visual.component';

describe('InnerVisualComponent', () => {
  let component: InnerVisualComponent;
  let fixture: ComponentFixture<InnerVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
