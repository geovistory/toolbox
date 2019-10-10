import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAndTypeSelectorComponent } from './class-and-type-selector.component';

describe('ClassAndTypeSelectorComponent', () => {
  let component: ClassAndTypeSelectorComponent;
  let fixture: ComponentFixture<ClassAndTypeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAndTypeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAndTypeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
