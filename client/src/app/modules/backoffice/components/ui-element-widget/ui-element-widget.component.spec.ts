import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiElementWidgetComponent } from './ui-element-widget.component';

describe('UiElementWidgetComponent', () => {
  let component: UiElementWidgetComponent;
  let fixture: ComponentFixture<UiElementWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiElementWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiElementWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
