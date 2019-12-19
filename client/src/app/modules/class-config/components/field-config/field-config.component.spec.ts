import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldConfigComponent } from './field-config.component';

describe('FieldConfigComponent', () => {
  let component: FieldConfigComponent;
  let fixture: ComponentFixture<FieldConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
