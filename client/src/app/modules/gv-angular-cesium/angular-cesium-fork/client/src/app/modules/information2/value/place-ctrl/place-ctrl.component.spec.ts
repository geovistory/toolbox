import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceCtrlComponent } from './place-ctrl.component';

describe('PlaceCtrlComponent', () => {
  let component: PlaceCtrlComponent;
  let fixture: ComponentFixture<PlaceCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
