import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItAddCtrlComponent } from './pe-it-add-ctrl.component';

describe('PeItAddCtrlComponent', () => {
  let component: PeItAddCtrlComponent;
  let fixture: ComponentFixture<PeItAddCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItAddCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItAddCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
