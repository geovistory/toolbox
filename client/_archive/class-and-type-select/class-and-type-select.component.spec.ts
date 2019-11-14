import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndTypeSelectComponent } from './class-and-type-select.component';

describe('ClassAndTypeSelectComponent', () => {
  let component: ClassAndTypeSelectComponent;
  let fixture: ComponentFixture<ClassAndTypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAndTypeSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAndTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
