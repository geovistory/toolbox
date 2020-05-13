import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFilterTextComponent } from './col-filter-text.component';

describe('ColFilterTextComponent', () => {
  let component: ColFilterTextComponent;
  let fixture: ComponentFixture<ColFilterTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColFilterTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColFilterTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
