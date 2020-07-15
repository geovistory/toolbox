import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgDimensionComponent } from './fg-dimension.component';

describe('FgDimensionComponent', () => {
  let component: FgDimensionComponent;
  let fixture: ComponentFixture<FgDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FgDimensionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
