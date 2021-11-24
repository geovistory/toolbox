import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldItemLayoutComponent } from './view-field-item-layout.component';

describe('ViewFieldItemLayoutComponent', () => {
  let component: ViewFieldItemLayoutComponent;
  let fixture: ComponentFixture<ViewFieldItemLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFieldItemLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFieldItemLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
