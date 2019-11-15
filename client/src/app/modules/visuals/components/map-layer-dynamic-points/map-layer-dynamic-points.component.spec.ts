import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLayerDynamicPointsComponent } from './map-layer-dynamic-points.component';

describe('MapLayerDynamicPointsComponent', () => {
  let component: MapLayerDynamicPointsComponent;
  let fixture: ComponentFixture<MapLayerDynamicPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLayerDynamicPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLayerDynamicPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
