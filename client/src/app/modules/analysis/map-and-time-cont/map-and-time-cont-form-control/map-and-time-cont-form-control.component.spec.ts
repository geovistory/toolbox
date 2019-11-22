import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAndTimeContFormControlComponent } from './map-and-time-cont-form-control.component';

describe('MapAndTimeContFormControlComponent', () => {
  let component: MapAndTimeContFormControlComponent;
  let fixture: ComponentFixture<MapAndTimeContFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAndTimeContFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAndTimeContFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
