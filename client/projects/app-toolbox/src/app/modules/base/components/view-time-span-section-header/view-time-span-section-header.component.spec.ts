import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSpanSectionHeaderComponent } from './view-time-span-section-header.component';

describe('ViewTimeSpanSectionHeaderComponent', () => {
  let component: ViewTimeSpanSectionHeaderComponent;
  let fixture: ComponentFixture<ViewTimeSpanSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeSpanSectionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
