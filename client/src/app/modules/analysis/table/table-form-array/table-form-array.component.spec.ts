import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormArrayComponent } from './table-form-array.component';

describe('TableFormArrayComponent', () => {
  let component: TableFormArrayComponent;
  let fixture: ComponentFixture<TableFormArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
