import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAndTimeContFormArrayComponent } from './map-and-time-cont-form-array.component';

describe('MapAndTimeContFormArrayComponent', () => {
  let component: MapAndTimeContFormArrayComponent;
  let fixture: ComponentFixture<MapAndTimeContFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAndTimeContFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAndTimeContFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
