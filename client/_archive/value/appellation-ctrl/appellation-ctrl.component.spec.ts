import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationCtrlComponent } from './appellation-ctrl.component';

describe('AppellationCtrlComponent', () => {
  let component: AppellationCtrlComponent;
  let fixture: ComponentFixture<AppellationCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
