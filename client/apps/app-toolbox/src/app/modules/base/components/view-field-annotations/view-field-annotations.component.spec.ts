import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldAnnotationsComponent } from './view-field-annotations.component';

describe('ViewFieldAnnotationsComponent', () => {
  let component: ViewFieldAnnotationsComponent;
  let fixture: ComponentFixture<ViewFieldAnnotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldAnnotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
