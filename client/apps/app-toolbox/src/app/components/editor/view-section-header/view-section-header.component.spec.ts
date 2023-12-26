import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionHeaderComponent } from './view-section-header.component';

describe('ViewSectionHeaderComponent', () => {
  let component: ViewSectionHeaderComponent;
  let fixture: ComponentFixture<ViewSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
