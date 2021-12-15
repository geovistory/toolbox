import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalsListComponent } from './digitals-list.component';

describe('DigitalsListComponent', () => {
  let component: DigitalsListComponent;
  let fixture: ComponentFixture<DigitalsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DigitalsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
