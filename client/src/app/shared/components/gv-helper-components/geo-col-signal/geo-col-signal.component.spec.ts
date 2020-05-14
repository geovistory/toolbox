import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoColSignalComponent } from './geo-col-signal.component';

describe('GeoColSignalComponent', () => {
  let component: GeoColSignalComponent;
  let fixture: ComponentFixture<GeoColSignalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoColSignalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoColSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
