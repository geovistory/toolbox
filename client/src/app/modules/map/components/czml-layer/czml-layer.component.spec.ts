import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CzmlLayerComponent } from './czml-layer.component';

describe('CzmlLayerComponent', () => {
  let component: CzmlLayerComponent;
  let fixture: ComponentFixture<CzmlLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CzmlLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CzmlLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
