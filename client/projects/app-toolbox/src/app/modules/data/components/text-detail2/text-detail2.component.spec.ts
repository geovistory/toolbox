import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDetail2Component } from './text-detail2.component';

describe('TextDetail2Component', () => {
  let component: TextDetail2Component;
  let fixture: ComponentFixture<TextDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextDetail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
