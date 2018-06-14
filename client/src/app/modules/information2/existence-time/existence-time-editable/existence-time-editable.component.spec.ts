import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeEditableComponent } from './existence-time-editable.component';

describe('ExistenceTimeEditableComponent', () => {
  let component: ExistenceTimeEditableComponent;
  let fixture: ComponentFixture<ExistenceTimeEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
