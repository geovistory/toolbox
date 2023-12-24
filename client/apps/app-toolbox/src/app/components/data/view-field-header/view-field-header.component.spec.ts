import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldHeaderComponent } from './view-field-header.component';

describe('ViewFieldHeaderComponent', () => {
  let component: ViewFieldHeaderComponent;
  let fixture: ComponentFixture<ViewFieldHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
