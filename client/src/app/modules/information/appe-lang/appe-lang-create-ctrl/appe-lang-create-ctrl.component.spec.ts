import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppeLangCreateCtrlComponent } from './appe-lang-create-ctrl.component';

describe('AppeLangCreateCtrlComponent', () => {
  let component: AppeLangCreateCtrlComponent;
  let fixture: ComponentFixture<AppeLangCreateCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppeLangCreateCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppeLangCreateCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
