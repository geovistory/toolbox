import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemContainerComponent } from './view-field-item-container.component';

describe('ViewFieldItemContainerComponent', () => {
  let component: ViewFieldItemContainerComponent;
  let fixture: ComponentFixture<ViewFieldItemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
