import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUnitPreviewComponent } from './data-unit-preview.component';

describe('DataUnitPreviewComponent', () => {
  let component: DataUnitPreviewComponent;
  let fixture: ComponentFixture<DataUnitPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataUnitPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUnitPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
