import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFilterNumericComponent } from './col-filter-numeric.component';

describe('ColFilterNumericComponent', () => {
  let component: ColFilterNumericComponent;
  let fixture: ComponentFixture<ColFilterNumericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColFilterNumericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColFilterNumericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
