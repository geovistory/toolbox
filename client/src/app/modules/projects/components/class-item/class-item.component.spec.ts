import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassItemComponent } from './class-item.component';

describe('ClassItemComponent', () => {
  let component: ClassItemComponent;
  let fixture: ComponentFixture<ClassItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
