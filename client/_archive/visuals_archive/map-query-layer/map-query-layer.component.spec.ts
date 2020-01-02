import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapQueryLayerComponent } from './map-query-layer.component';

describe('MapQueryLayerComponent', () => {
  let component: MapQueryLayerComponent;
  let fixture: ComponentFixture<MapQueryLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapQueryLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapQueryLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
