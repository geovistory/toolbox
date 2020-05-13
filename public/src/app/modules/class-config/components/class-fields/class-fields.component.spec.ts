import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFieldsComponent } from './class-fields.component';

describe('ClassFieldsComponent', () => {
  let component: ClassFieldsComponent;
  let fixture: ComponentFixture<ClassFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
