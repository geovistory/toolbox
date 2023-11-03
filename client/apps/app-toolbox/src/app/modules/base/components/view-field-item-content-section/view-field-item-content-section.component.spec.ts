import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemContentSectionComponent } from './view-field-item-content-section.component';

describe('ViewFieldItemContentSectionComponent', () => {
  let component: ViewFieldItemContentSectionComponent;
  let fixture: ComponentFixture<ViewFieldItemContentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemContentSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemContentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
