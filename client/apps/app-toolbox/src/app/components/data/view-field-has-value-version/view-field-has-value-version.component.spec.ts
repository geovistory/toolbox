import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldHasValueVersionComponent } from './view-field-has-value-version.component';

describe('ViewFieldHasValueVersionComponent', () => {
  let component: ViewFieldHasValueVersionComponent;
  let fixture: ComponentFixture<ViewFieldHasValueVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldHasValueVersionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldHasValueVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
