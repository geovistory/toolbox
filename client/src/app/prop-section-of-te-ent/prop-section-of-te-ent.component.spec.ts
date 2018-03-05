import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropSectionOfTeEntComponent } from './prop-section-of-te-ent.component';

describe('PropSectionOfTeEntComponent', () => {
  let component: PropSectionOfTeEntComponent;
  let fixture: ComponentFixture<PropSectionOfTeEntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropSectionOfTeEntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropSectionOfTeEntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
