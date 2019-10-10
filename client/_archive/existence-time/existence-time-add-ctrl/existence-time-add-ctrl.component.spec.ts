import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeAddCtrlComponent } from './existence-time-add-ctrl.component';

describe('ExistenceTimeAddCtrlComponent', () => {
  let component: ExistenceTimeAddCtrlComponent;
  let fixture: ComponentFixture<ExistenceTimeAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
