import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTimeSpanSectionBodyComponent } from './view-time-span-section-body.component';

describe('ViewTimeSpanSectionBodyComponent', () => {
  let component: ViewTimeSpanSectionBodyComponent;
  let fixture: ComponentFixture<ViewTimeSpanSectionBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTimeSpanSectionBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTimeSpanSectionBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
