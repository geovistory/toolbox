import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAndTimeContComponent } from './map-and-time-cont.component';

describe('MapAndTimeContComponent', () => {
  let component: MapAndTimeContComponent;
  let fixture: ComponentFixture<MapAndTimeContComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAndTimeContComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAndTimeContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
