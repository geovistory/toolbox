import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFormGroupComponent } from './table-form-group.component';

describe('TableFormGroupComponent', () => {
  let component: TableFormGroupComponent;
  let fixture: ComponentFixture<TableFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
