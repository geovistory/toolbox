import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSearchTypeaheadComponent } from './language-search-typeahead.component';

describe('LanguageSearchTypeaheadComponent', () => {
  let component: LanguageSearchTypeaheadComponent;
  let fixture: ComponentFixture<LanguageSearchTypeaheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSearchTypeaheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSearchTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
