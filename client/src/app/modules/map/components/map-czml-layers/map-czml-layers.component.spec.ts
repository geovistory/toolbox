import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCzmlLayersComponent } from './map-czml-layers.component';

describe('MapCzmlLayersComponent', () => {
  let component: MapCzmlLayersComponent;
  let fixture: ComponentFixture<MapCzmlLayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapCzmlLayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCzmlLayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
