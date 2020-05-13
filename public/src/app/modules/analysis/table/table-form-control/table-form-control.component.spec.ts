import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormControlComponent } from './table-form-control.component';

describe('TableFormControlComponent', () => {
  let component: TableFormControlComponent;
  let fixture: ComponentFixture<TableFormControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
