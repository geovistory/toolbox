import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueMatcherComponent } from './value-matcher.component';

describe('ValueMatcherComponent', () => {
  let component: ValueMatcherComponent;
  let fixture: ComponentFixture<ValueMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValueMatcherComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
