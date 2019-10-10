import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageViewComponent } from './language-view.component';

describe('LanguageViewComponent', () => {
  let component: LanguageViewComponent;
  let fixture: ComponentFixture<LanguageViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
