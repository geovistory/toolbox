import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsetEndComponent } from './fieldset-end.component';

describe('FieldsetEndComponent', () => {
  let component: FieldsetEndComponent;
  let fixture: ComponentFixture<FieldsetEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldsetEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsetEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
