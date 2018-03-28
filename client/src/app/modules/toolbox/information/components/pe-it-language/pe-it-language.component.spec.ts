import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeItLanguageComponent } from './pe-it-language.component';

describe('PeItLanguageComponent', () => {
  let component: PeItLanguageComponent;
  let fixture: ComponentFixture<PeItLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeItLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeItLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
