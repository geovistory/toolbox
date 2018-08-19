import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationCtrlComponent } from './annotation-ctrl.component';

describe('AnnotationCtrlComponent', () => {
  let component: AnnotationCtrlComponent;
  let fixture: ComponentFixture<AnnotationCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
