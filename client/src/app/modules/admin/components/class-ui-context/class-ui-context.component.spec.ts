import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassUiContextComponent } from './class-ui-context.component';

describe('ClassUiContextComponent', () => {
  let component: ClassUiContextComponent;
  let fixture: ComponentFixture<ClassUiContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassUiContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassUiContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
