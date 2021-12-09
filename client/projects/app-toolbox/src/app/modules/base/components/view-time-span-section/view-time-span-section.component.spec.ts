import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSpanSectionComponent } from './view-time-span-section.component';

describe('ViewTimeSpanSectionComponent', () => {
  let component: ViewTimeSpanSectionComponent;
  let fixture: ComponentFixture<ViewTimeSpanSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeSpanSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
