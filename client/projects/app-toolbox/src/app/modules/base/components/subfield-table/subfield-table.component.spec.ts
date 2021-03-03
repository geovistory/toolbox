import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubfieldTableComponent } from './subfield-table.component';

describe('SubfieldTableComponent', () => {
  let component: SubfieldTableComponent;
  let fixture: ComponentFixture<SubfieldTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubfieldTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubfieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
