import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemNestedComponent } from './view-field-item-nested.component';

describe('ViewFieldItemNestedComponent', () => {
  let component: ViewFieldItemNestedComponent;
  let fixture: ComponentFixture<ViewFieldItemNestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemNestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
