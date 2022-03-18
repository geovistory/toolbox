import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldAnnotationsOfCellItemComponent } from './view-field-annotations-of-cell-item.component';

describe('ViewFieldAnnotationsOfCellItemComponent', () => {
  let component: ViewFieldAnnotationsOfCellItemComponent;
  let fixture: ComponentFixture<ViewFieldAnnotationsOfCellItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldAnnotationsOfCellItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldAnnotationsOfCellItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
