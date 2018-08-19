import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceViewComponent } from './place-view.component';

describe('PlaceViewComponent', () => {
  let component: PlaceViewComponent;
  let fixture: ComponentFixture<PlaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
