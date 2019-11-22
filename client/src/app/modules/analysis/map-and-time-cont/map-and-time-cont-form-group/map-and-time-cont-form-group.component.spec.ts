import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAndTimeContFormGroupComponent } from './map-and-time-cont-form-group.component';

describe('MapAndTimeContFormGroupComponent', () => {
  let component: MapAndTimeContFormGroupComponent;
  let fixture: ComponentFixture<MapAndTimeContFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAndTimeContFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAndTimeContFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
