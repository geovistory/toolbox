import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEntityComponent } from './form-create-entity.component';

describe('FormCreateEntityComponent', () => {
  let component: FormCreateEntityComponent;
  let fixture: ComponentFixture<FormCreateEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCreateEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
