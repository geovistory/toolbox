import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVisualComponent } from './map-visual.component';

describe('MapVisualComponent', () => {
  let component: MapVisualComponent;
  let fixture: ComponentFixture<MapVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
