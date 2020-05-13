import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditFormComponent } from './type-edit-form.component';

describe('TypeEditFormComponent', () => {
  let component: TypeEditFormComponent;
  let fixture: ComponentFixture<TypeEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
