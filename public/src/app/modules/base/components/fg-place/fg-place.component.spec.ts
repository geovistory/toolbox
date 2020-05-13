import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgPlaceComponent } from './fg-place.component';

describe('FgPlaceComponent', () => {
  let component: FgPlaceComponent;
  let fixture: ComponentFixture<FgPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
