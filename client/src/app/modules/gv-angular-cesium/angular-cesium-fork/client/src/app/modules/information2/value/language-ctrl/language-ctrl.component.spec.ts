import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCtrlComponent } from './language-ctrl.component';

describe('LanguageCtrlComponent', () => {
  let component: LanguageCtrlComponent;
  let fixture: ComponentFixture<LanguageCtrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageCtrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCtrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
