import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExTimePropertyFieldAddCtrlComponent } from './ex-time-property-field-add-ctrl.component';

describe('ExTimePropertyFieldAddCtrlComponent', () => {
  let component: ExTimePropertyFieldAddCtrlComponent;
  let fixture: ComponentFixture<ExTimePropertyFieldAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExTimePropertyFieldAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExTimePropertyFieldAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
