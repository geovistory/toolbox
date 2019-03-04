import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndTypeFilterComponent } from './class-and-type-filter.component';

describe('ClassAndTypeFilterComponent', () => {
  let component: ClassAndTypeFilterComponent;
  let fixture: ComponentFixture<ClassAndTypeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAndTypeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAndTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
