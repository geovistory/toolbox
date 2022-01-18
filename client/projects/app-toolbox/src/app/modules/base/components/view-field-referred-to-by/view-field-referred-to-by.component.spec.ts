import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldReferredToByComponent } from './view-field-referred-to-by.component';

describe('ViewFieldReferredToByComponent', () => {
  let component: ViewFieldReferredToByComponent;
  let fixture: ComponentFixture<ViewFieldReferredToByComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldReferredToByComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldReferredToByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
