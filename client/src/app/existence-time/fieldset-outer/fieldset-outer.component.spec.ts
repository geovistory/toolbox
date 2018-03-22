import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsetOuterComponent } from './fieldset-outer.component';

describe('FieldsetOuterComponent', () => {
  let component: FieldsetOuterComponent;
  let fixture: ComponentFixture<FieldsetOuterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsetOuterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsetOuterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
