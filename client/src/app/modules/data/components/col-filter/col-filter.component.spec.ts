import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFilterComponent } from './col-filter.component';

describe('ColFilterComponent', () => {
  let component: ColFilterComponent;
  let fixture: ComponentFixture<ColFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
