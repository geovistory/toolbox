import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionComponent } from './view-section.component';

describe('ViewSectionComponent', () => {
  let component: ViewSectionComponent;
  let fixture: ComponentFixture<ViewSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
