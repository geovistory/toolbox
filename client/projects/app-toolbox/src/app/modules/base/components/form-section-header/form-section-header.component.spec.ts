import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionHeaderComponent } from './form-section-header.component';

describe('FormSectionHeaderComponent', () => {
  let component: FormSectionHeaderComponent;
  let fixture: ComponentFixture<FormSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSectionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
