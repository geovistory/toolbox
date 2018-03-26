import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropSectionListOfPeItComponent } from './prop-section-list-of-pe-it.component';

describe('PropSectionListOfPeItComponent', () => {
  let component: PropSectionListOfPeItComponent;
  let fixture: ComponentFixture<PropSectionListOfPeItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropSectionListOfPeItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropSectionListOfPeItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
