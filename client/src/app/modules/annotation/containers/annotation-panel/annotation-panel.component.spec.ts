import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationPanelComponent } from './annotation-panel.component';

describe('AnnotationPanelComponent', () => {
  let component: AnnotationPanelComponent;
  let fixture: ComponentFixture<AnnotationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
