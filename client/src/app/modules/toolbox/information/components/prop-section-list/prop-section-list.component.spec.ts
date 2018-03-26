import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropSectionListComponent } from './prop-section-list.component';

describe('PropSectionListComponent', () => {
  let component: PropSectionListComponent;
  let fixture: ComponentFixture<PropSectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropSectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropSectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
