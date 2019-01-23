import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfhLabelEditComponent } from './dfh-label-edit.component';

describe('DfhLabelEditComponent', () => {
  let component: DfhLabelEditComponent;
  let fixture: ComponentFixture<DfhLabelEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfhLabelEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfhLabelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
