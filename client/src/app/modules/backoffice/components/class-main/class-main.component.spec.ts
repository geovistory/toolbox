import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMainComponent } from './class-main.component';

describe('ClassMainComponent', () => {
  let component: ClassMainComponent;
  let fixture: ComponentFixture<ClassMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
