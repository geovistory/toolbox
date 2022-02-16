import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldHasTableValueComponent } from './view-field-has-table-value.component';

describe('ViewFieldHasTableValueComponent', () => {
  let component: ViewFieldHasTableValueComponent;
  let fixture: ComponentFixture<ViewFieldHasTableValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldHasTableValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldHasTableValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
