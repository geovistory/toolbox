import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DfhLabelCreateComponent } from './dfh-label-create.component';

describe('DfhLabelCreateComponent', () => {
  let component: DfhLabelCreateComponent;
  let fixture: ComponentFixture<DfhLabelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DfhLabelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DfhLabelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
