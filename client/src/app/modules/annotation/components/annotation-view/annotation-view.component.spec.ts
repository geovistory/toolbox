import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationViewComponent } from './annotation-view.component';

describe('AnnotationViewComponent', () => {
  let component: AnnotationViewComponent;
  let fixture: ComponentFixture<AnnotationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
