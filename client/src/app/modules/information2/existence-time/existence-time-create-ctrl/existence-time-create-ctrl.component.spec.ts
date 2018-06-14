import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenceTimeCreateCtrlComponent } from './existence-time-create-ctrl.component';

describe('ExistenceTimeCreateCtrlComponent', () => {
  let component: ExistenceTimeCreateCtrlComponent;
  let fixture: ComponentFixture<ExistenceTimeCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenceTimeCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenceTimeCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
