import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppellationCtrl2Component } from './appellation-ctrl2.component';

describe('AppellationCtrl2Component', () => {
  let component: AppellationCtrl2Component;
  let fixture: ComponentFixture<AppellationCtrl2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppellationCtrl2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppellationCtrl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
