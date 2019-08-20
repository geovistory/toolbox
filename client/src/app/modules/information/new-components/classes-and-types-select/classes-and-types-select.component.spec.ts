import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesAndTypesSelectComponent } from './classes-and-types-select.component';

describe('ClassesAndTypesSelectComponent', () => {
  let component: ClassesAndTypesSelectComponent;
  let fixture: ComponentFixture<ClassesAndTypesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesAndTypesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesAndTypesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
