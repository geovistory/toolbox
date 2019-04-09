import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVisualDemoComponent } from './map-visual-demo.component';

describe('MapVisualDemoComponent', () => {
  let component: MapVisualDemoComponent;
  let fixture: ComponentFixture<MapVisualDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapVisualDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVisualDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
