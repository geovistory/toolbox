import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFieldListComponent } from './class-field-list.component';

describe('ClassFieldListComponent', () => {
  let component: ClassFieldListComponent;
  let fixture: ComponentFixture<ClassFieldListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassFieldListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
