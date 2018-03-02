import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropSectionOfPeItComponent } from './prop-section-of-pe-it.component';

describe('PropSectionOfPeItComponent', () => {
  let component: PropSectionOfPeItComponent;
  let fixture: ComponentFixture<PropSectionOfPeItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropSectionOfPeItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropSectionOfPeItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
