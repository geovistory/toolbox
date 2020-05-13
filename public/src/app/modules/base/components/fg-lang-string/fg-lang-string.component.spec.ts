import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgLangStringComponent } from './fg-lang-string.component';

describe('FgLangStringComponent', () => {
  let component: FgLangStringComponent;
  let fixture: ComponentFixture<FgLangStringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FgLangStringComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgLangStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
