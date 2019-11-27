import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAndTimeContFormComponent } from './map-and-time-cont-form.component';

describe('MapAndTimeContFormComponent', () => {
  let component: MapAndTimeContFormComponent;
  let fixture: ComponentFixture<MapAndTimeContFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAndTimeContFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAndTimeContFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
