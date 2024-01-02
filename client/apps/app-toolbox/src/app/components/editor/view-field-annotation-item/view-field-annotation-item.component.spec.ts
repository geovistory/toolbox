import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldAnnotationItemComponent } from './view-field-annotation-item.component';

describe('ViewFieldAnnotationItemComponent', () => {
  let component: ViewFieldAnnotationItemComponent;
  let fixture: ComponentFixture<ViewFieldAnnotationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldAnnotationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldAnnotationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
