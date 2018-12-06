import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldHeaderComponent } from './field-header.component';

describe('FieldHeaderComponent', () => {
  let component: FieldHeaderComponent;
  let fixture: ComponentFixture<FieldHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
