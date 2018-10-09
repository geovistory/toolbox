import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditableComponent } from './type-editable.component';

describe('TypeEditableComponent', () => {
  let component: TypeEditableComponent;
  let fixture: ComponentFixture<TypeEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
