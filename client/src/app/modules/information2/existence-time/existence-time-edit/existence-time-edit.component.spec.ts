import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeEditComponent } from './existence-time-edit.component';

describe('ExistenceTimeEditComponent', () => {
  let component: ExistenceTimeEditComponent;
  let fixture: ComponentFixture<ExistenceTimeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
