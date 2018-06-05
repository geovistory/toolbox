import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItCreateCtrlComponent } from './pe-it-create-ctrl.component';

describe('PeItCreateCtrlComponent', () => {
  let component: PeItCreateCtrlComponent;
  let fixture: ComponentFixture<PeItCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
