import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsetInnerComponent } from './fieldset-inner.component';

describe('FieldsetInnerComponent', () => {
  let component: FieldsetInnerComponent;
  let fixture: ComponentFixture<FieldsetInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsetInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsetInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
