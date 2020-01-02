import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfhLabelListEditComponent } from './dfh-label-list-edit.component';

describe('DfhLabelListEditComponent', () => {
  let component: DfhLabelListEditComponent;
  let fixture: ComponentFixture<DfhLabelListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfhLabelListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfhLabelListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
