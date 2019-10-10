import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItPropertyFieldAddCtrlComponent } from './pe-it-property-field-add-ctrl.component';

describe('PeItPropertyFieldAddCtrlComponent', () => {
  let component: PeItPropertyFieldAddCtrlComponent;
  let fixture: ComponentFixture<PeItPropertyFieldAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItPropertyFieldAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItPropertyFieldAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
